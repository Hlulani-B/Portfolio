const URL = "http://localhost:3000/chat";

const conversations = [
  {
    title: "Conversation 1: intro and background",
    messages: [
      "Hi!",
      "Tell me about yourself",
      "Why did you switch from maths to computer science?",
    ],
  },
  {
    title: "Conversation 2: specific project questions",
    messages: [
      "What tech stack did you use for Nova?",
      "Does it have a docs site?",
      "Where can I see the source code?",
    ],
  },
  {
    title: "Conversation 3: broad then follow up",
    messages: [
      "What projects have you built?",
      "Tell me more about the one that uses five AI providers",
      "What problems did you run into with it?",
    ],
  },
  {
    title: "Conversation 4: missing data and off topic",
    messages: [
      "Is there a demo video for Data Cleaner?",
      "What is the capital of France?",
    ],
  },
];

async function ask(history_prompt, current_prompt) {
  const res = await fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ history_prompt, current_prompt }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
  return data.markdown;
}

async function run() {
  for (const convo of conversations) {
    console.log("\n" + "=".repeat(60));
    console.log(convo.title);
    console.log("=".repeat(60));

    let history = "";

    for (const message of convo.messages) {
      console.log(`\nVisitor: ${message}`);
      const start = Date.now();

      try {
        const markdown = await ask(history, message);
        console.log(`\nHlulani (${((Date.now() - start) / 1000).toFixed(1)}s):\n${markdown}`);
        history += `Visitor: ${message}\nHlulani: ${markdown}\n`;
      } catch (err) {
        console.log(`\nERROR: ${err.message}`);
      }
    }
  }
}

run();