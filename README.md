# Hlulani Baloyi, Portfolio

My personal portfolio site, showing the projects I have built and a chatbot that answers questions about me and my work.

Live site: https://hlulani-b.github.io/Portfolio/

## About me

I am a final year BSc Computer Science student at the University of the Witwatersrand, graduating at the end of 2026. I build AI integrated web applications and backend systems that solve real problems. My strongest tools are Node.js, Express and React, and I am aiming for a full stack developer role with a long term focus on AI engineering.

## What is in this repo

The site is plain HTML, CSS and JavaScript with no build step. It is hosted on GitHub Pages.

```
Portfolio/
  index.html          Main page: hero, about, projects, contact and chatbot
  styles.css          Main styles
  project-styles.css  Styles shared by the project detail pages
  script.js           Navigation and page behaviour
  projects.js         Project page behaviour
  *.html              One detail page per project
  service/            Express server that powers the chatbot
  render.yaml         Render deployment settings for the server
```

## Featured projects

1. Data Cleaner and Visualiser: a browser based workspace for cleaning CSV and Excel files with over 40 cleaning tools and AI generated charts.
2. Rihanyo: a multi agent appointment booking assistant for medical practices, built on free tiers with a fallback chain across five AI providers.
3. Digital Logbook: a microservices productivity app with four Node and Express services, built as a team project.
4. E-Draft: an AI email drafting tool that sends through the Gmail API.
5. Cortex: turns lectures and YouTube videos into structured PDF notes using Gemini.
6. Derma: analyses a webcam photo of your skin and recommends matching products.
7. Dira: a local first task manager built with Next.js and SQLite.
8. Safe (SOS): a covert safety app for survivors of gender based violence, hidden inside everyday apps.
9. SOS App: the cloud backed version of Safe, disguised as a weather app with live location sharing.
10. Nova: an AI powered CSV cleaning pipeline that writes and runs pandas code, with hard checks deciding when to stop.

Each project has its own detail page with the tech stack, a live demo or video where one exists, and a link to the source code.

## The chatbot

The chat button in the bottom right corner opens a chatbot that answers questions about my background and projects.

How it works:

1. The page sends the current message and the earlier conversation to a small Express server.
2. The server tries Groq first, then Gemini, then OpenRouter, and moves to the next provider if one fails or runs out of quota.
3. The server replies with markdown, and the page renders it safely using marked and DOMPurify.
4. The conversation is kept in the browser with localStorage, and the Clear button removes it.

The server lives in the `service` folder and is deployed on the Render free plan. Because of that, the first reply after a quiet spell can take a little longer while the server wakes up.

## Running it locally

Run the site by opening `index.html` in a browser, or serve the folder with `npx serve`.

To run the chat server:

```
cd service
npm install
node index.js
```

Create a `.env` file inside `service` with your own keys:

```
GROQ_TOKEN=your_key
GEMINI_TOKEN=your_key
OPEN_TOKEN=your_key
```

Never commit the `.env` file. Then set `API_URL` near the bottom of `index.html` to `http://localhost:3000/chat` while testing.

## Tech used

HTML, CSS, JavaScript, Node.js, Express, Groq, Google Gemini, OpenRouter, GitHub Pages and Render.

## Contact

GitHub: https://github.com/Hlulani-B
