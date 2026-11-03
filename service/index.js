import express from "express";
import { answerQuery } from "./response.js";

const app = express();
const PORT = 3000;

import cors from "cors";
app.use(cors());

const ABOUT_ME = `I'm Hlulani Baloyi, a final year computer science student at Wits University, graduating in December 2026. I'm from Giyani in Limpopo, where I went to Khanyisa Education Centre, and I'm willing to relocate for the right role. My GitHub is Hlulani-B.

I studied at Wits from 2023 to 2026. I originally applied for computational and applied mathematics because I liked maths in high school. It didn't stick. I never did physical science in school, so physics was a struggle. I took it as a first year elective and passed, but I was never good at it, and I really disliked the mechanics and scientific computing modules. In second year I switched to a double major in computer science, which had started out as just an elective for me.

I want to work as a full stack developer first, and I also want to become an AI engineer. My strongest tools are Node.js, Express and React. I started out preferring backend because the problems made sense to me and I could work through them. Frontend used to frustrate me. Before I used AI tools it could take ages just to get a button in the right spot, and even after designing the UI first the results weren't good. That changed once I was introduced to Qoder. I took the lead on the UI for my school project, Digital Logbook.

A lot of what I build is AI integrated. Digital Logbook lets you type or say something like "math due friday high priority" and the AI files it. Rihanyo is a multi agent appointment booking assistant for medical practices, built entirely on free tiers with a fallback chain across five AI providers so it keeps working when one runs out. Nova has an AI write and run pandas code to clean messy CSVs, while hard checks decide when to stop. Derma looks at a webcam photo of your skin and recommends matching products. Cortex turns lectures and YouTube videos into structured PDF notes. E-Draft drafts emails and sends them through Gmail. Data Cleaner & Visualiser has over 40 cleaning tools and AI generated chart insights.

Two things I'm proud of. Digital Logbook was a team project where I made 648 non merge commits across the whole repo, and most of that work was making features survive production. Safe is a covert safety app for survivors of gender based violence that hides inside a calculator, a weather app and a clothing boutique, with hidden triggers that record or send an alert with live location. I care about building products I can be proud of and solving the problems that come up inside them.

Since September 2026 I've been an HRIS (Human Resources Information Systems) intern. I do user support, and I investigate requirements to see whether Oracle already provides solutions for them and how those solutions could be implemented. I can't share specifics because of confidentiality.

Longer term I'm interested in entrepreneurship, including healthcare facilities and fintech ideas.

Outside of tech I don't really have hobbies. I've been making myself walk or go to the gym, I can crochet a little, and I'm planning to learn how to cook.`;

app.use(express.json());

// Define a basic route
app.get("/", (req, res) => {
  res.send("Hello from my new Express.js server!");
});

// Chat route: POST { "history_prompt": "...", "current_prompt": "..." }
app.post("/chat", async (req, res) => {
  const { history_prompt = "", current_prompt } = req.body;

  if (!current_prompt) {
    return res.status(400).json({ error: "current_prompt is required" });
  }

  try {
    const result = await answerQuery(history_prompt, current_prompt, ABOUT_ME);
    res.json(result); // { markdown: "..." }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});