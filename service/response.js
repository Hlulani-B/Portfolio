import projects, { projectKeys } from "./projects.js";
import { aiJson } from "./ai.js";

const MISSING_VALUE = "say I dont have this";

const KEY_GUIDE = {
  overview: "what the project is and does",
  tech_stack: "technologies used",
  video_link: "demo video URL",
  site_link: "live demo URL",
  source_code: "GitHub URL",
  documentation_site: "documentation site URL",
  problems: "challenges faced and how they were solved",
  additional:
    "extra detail: key features, contributions, how it works, architecture, deployed services, database design",
};

// "name" is always included, so it is not selectable
const SELECTABLE_KEYS = projectKeys.filter((k) => k !== "name");

const KEYS_FOR_PROMPT = SELECTABLE_KEYS.map((k) => `- ${k}: ${KEY_GUIDE[k] || ""}`).join("\n");

const SUMMARIES = JSON.stringify(projects.map((p) => `${p.name}: ${p.overview}`));

const toText = (v) => (typeof v === "string" ? v : JSON.stringify(v ?? ""));

const isMissing = (v) =>
  v == null ||
  v === "" ||
  (Array.isArray(v) && v.length === 0) ||
  (typeof v === "object" && !Array.isArray(v) && Object.keys(v).length === 0);

function routerPrompt(history, current, aboutMe) {
  return `You are Hlulani, replying to a visitor on your own portfolio site. Always speak in first person (I, my, me). Decide how to respond to the visitor's latest message.

ABOUT ME:
${aboutMe}

PROJECT SUMMARIES (name: overview):
${SUMMARIES}

KEYS YOU CAN REQUEST PER PROJECT (the name is always included automatically):
${KEYS_FOR_PROMPT}

CONVERSATION SO FAR:
${history}

CURRENT MESSAGE:
${current}

Return a JSON object with a key "action".

action 1: the visitor is asking nothing specific about the projects (greetings, small talk, questions about me or my background that ABOUT ME already answers). Return {"action":1,"message":"..."} where message is your reply written in markdown. Use \\n for line breaks inside the JSON string.

action 0: the visitor needs project details. Return {"action":0,"selection":[{"name":"<exact project name>","keys":["<key>", ...]}]}.
Rules for action 0:
- Only include the projects the question is about.
- Only request the keys needed to answer. Never request everything. For example, a question about the tech stack of one project gets keys ["tech_stack"] for that project only.
- For broad questions like "what have you built", request just ["overview"] for the relevant projects.
- Use only the key names listed above and the exact project names from the summaries.
- If the visitor asks for something a project may not have (like a docs site or video), still request that key.`;
}

function answerPrompt(history, current, aboutMe, dataString) {
  return `You are Hlulani, replying to a visitor on your own portfolio site. Always speak in first person (I, my, me). Answer the visitor's latest message.

ABOUT ME:
${aboutMe}

PROJECT DATA (JSON, only what was needed for this question):
${dataString}

CONVERSATION SO FAR:
${history}

CURRENT MESSAGE:
${current}

Rules:
- Answer only from the project data and about me. If the data does not contain what was asked, say so plainly.
- If a value is "${MISSING_VALUE}", tell the visitor that I don't have that for that project.
- Answer what was asked, do not dump all the data.
- Write the answer in markdown. Show links as markdown links.
- Return {"markdown":"..."} and use \\n for line breaks inside the JSON string.`;
}

// Phase 2: build only what the AI asked for
function buildData(selection) {
  const merged = new Map();
  for (const item of selection) {
    const project = projects.find(
      (p) => p.name.toLowerCase() === String(item?.name).trim().toLowerCase()
    );
    if (!project) continue;
    const entry = merged.get(project.name) || { name: project.name };
    for (const key of Array.isArray(item.keys) ? item.keys : []) {
      if (!SELECTABLE_KEYS.includes(key)) continue;
      entry[key] = isMissing(project[key]) ? MISSING_VALUE : project[key];
    }
    merged.set(project.name, entry);
  }
  return [...merged.values()];
}

export async function answerQuery(history_prompt, current_prompt, about_me) {
  const history = toText(history_prompt);
  const current = toText(current_prompt);
  const aboutMe = toText(about_me);

  // Phase 1: route
  const route = await aiJson(routerPrompt(history, current, aboutMe));

  if (Number(route.action) === 1 && typeof route.message === "string") {
    return { markdown: route.message };
  }

  // Phase 2: build
  const data = buildData(Array.isArray(route.selection) ? route.selection : []);
  const dataString = JSON.stringify(data);

  // Phase 3: answer
  const final = await aiJson(answerPrompt(history, current, aboutMe, dataString));
  if (typeof final.markdown !== "string") throw new Error("AI did not return markdown");
  return { markdown: final.markdown };
}