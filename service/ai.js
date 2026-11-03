// Node 18+ (uses built-in fetch)
import "dotenv/config";

const TIMEOUT_MS = 30000;

// Used first if live listing works, and as the only list if it fails.
const STATIC = {
  groq: [
    "openai/gpt-oss-120b",
    "openai/gpt-oss-20b",
    "qwen/qwen3.8-27b",
  ],
  gemini: [
    "gemini-3.8-flash",
    "gemini-3.7-flash",
    "gemini-3.6-flash",
    "gemini-3.5-flash",
    "gemini-3.1-pro-preview",
  ],
  openrouter: [
    "google/gemma-4-31b-it:free",
    "google/gemma-4-26b-a4b-it:free",
    "cohere/north-mini-code:free",
    "nvidia/nemotron-3-ultra-550b-a55b:free",
    "thinkingmachines/inkling-small:free",
  ],
};

const cache = {};

const getJson = async (url, headers = {}) => {
  const res = await fetch(url, { headers, signal: AbortSignal.timeout(TIMEOUT_MS) });
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
  return res.json();
};

const postJson = async (url, headers, body) => {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
  return res.json();
};

// Put known good models first, then anything else discovered live.
const merge = (preferred, live) => {
  const set = new Set(live);
  return [...preferred.filter((m) => set.has(m)), ...live.filter((m) => !preferred.includes(m))];
};

const NON_CHAT = /whisper|tts|guard|embed|image|imagen|veo|live|audio|orpheus|playai|aqa|robotics|computer-use/i;

const listModels = {
  async groq(key) {
    const data = await getJson("https://api.groq.com/openai/v1/models", {
      Authorization: `Bearer ${key}`,
    });
    return data.data.filter((m) => m.active !== false && !NON_CHAT.test(m.id)).map((m) => m.id);
  },
  async gemini(key) {
    const data = await getJson(
      `https://generativelanguage.googleapis.com/v1beta/models?pageSize=200&key=${key}`
    );
    return data.models
      .filter((m) => m.supportedGenerationMethods?.includes("generateContent"))
      .map((m) => m.name.replace(/^models\//, ""))
      .filter((id) => /^(gemini|gemma)/.test(id) && !NON_CHAT.test(id) && !/preview|exp/.test(id));
  },
  async openrouter() {
    const data = await getJson("https://openrouter.ai/api/v1/models");
    return data.data
      .filter((m) => {
        const free = m.id.endsWith(":free") || (Number(m.pricing?.prompt) === 0 && Number(m.pricing?.completion) === 0);
        const textOut = !m.architecture?.output_modalities || m.architecture.output_modalities.includes("text");
        return free && textOut && m.id !== "openrouter/auto";
      })
      .map((m) => m.id);
  },
};

async function getModels(provider, key) {
  if (cache[provider]) return cache[provider];
  let models;
  try {
    models = merge(STATIC[provider], await listModels[provider](key));
    if (!models.length) models = STATIC[provider];
  } catch {
    models = STATIC[provider];
  }
  return (cache[provider] = models);
}

const callers = {
  async groq(model, prompt, key) {
    const data = await postJson(
      "https://api.groq.com/openai/v1/chat/completions",
      { Authorization: `Bearer ${key}` },
      { model, messages: [{ role: "user", content: prompt }], temperature: 0.2 }
    );
    return data.choices?.[0]?.message?.content;
  },
  async gemini(model, prompt, key) {
    const data = await postJson(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`,
      {},
      { contents: [{ role: "user", parts: [{ text: prompt }] }], generationConfig: { temperature: 0.2 } }
    );
    return data.candidates?.[0]?.content?.parts?.map((p) => p.text || "").join("");
  },
  async openrouter(model, prompt, key) {
    const data = await postJson(
      "https://openrouter.ai/api/v1/chat/completions",
      { Authorization: `Bearer ${key}` },
      { model, messages: [{ role: "user", content: prompt }], temperature: 0.2 }
    );
    return data.choices?.[0]?.message?.content;
  },
};

// Strips code fences and <think> blocks, then pulls out the first JSON object or array.
function parseJson(text) {
  if (!text) throw new Error("Empty response");
  let t = text.replace(/<think>[\s\S]*?<\/think>/gi, "").replace(/```(?:json)?/gi, "").trim();
  try {
    return JSON.parse(t);
  } catch {}
  const start = t.search(/[{[]/);
  if (start === -1) throw new Error("No JSON found");
  const open = t[start];
  const close = open === "{" ? "}" : "]";
  const end = t.lastIndexOf(close);
  if (end <= start) throw new Error("No JSON found");
  return JSON.parse(t.slice(start, end + 1));
}

async function aiJson(prompt) {
  const keys = {
    groq: process.env.GROQ_TOKEN,
    gemini: process.env.GEMINI_TOKEN,
    openrouter: process.env.OPEN_TOKEN,
  };
  const fullPrompt = `${prompt}\n\nRespond with valid JSON only. No explanation, no markdown, no code fences.`;
  const errors = [];

  for (const provider of ["groq", "gemini", "openrouter"]) {
    if (!keys[provider]) {
      errors.push(`${provider}: no API key`);
      continue;
    }
    const models = await getModels(provider, keys[provider]);
    for (const model of models) {
      try {
        const text = await callers[provider](model, fullPrompt, keys[provider]);
        return parseJson(text);
      } catch (err) {
        errors.push(`${provider}/${model}: ${err.message.slice(0, 150)}`);
      }
    }
  }
  throw new Error(`All models failed:\n${errors.join("\n")}`);
}

export { aiJson };