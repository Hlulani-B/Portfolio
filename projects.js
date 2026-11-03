export const projects = [
  {
    github_url: "https://github.com/Hlulani-B/Data-Cleaner",
    overview: "A fast, browser-based data-cleansing and visualization workspace that bridges the gap between fragile spreadsheets and tedious custom scripts. Users can upload CSV or XLSX files, run an automatic initial clean, then apply over 40 individual cleaning functions with undo, draft history, and Neon database persistence. The platform features AI-powered chart generation with 11 chart types, real-time data search, and a natural-language function search bar where users describe what they want in plain English."
  },
  {
    github_url: "https://github.com/Hlulani-B/Rihanyo",
    overview: "A multi-agent, AI-powered appointment booking assistant that connects patients with medical practices through natural conversation. Practices can register and manage appointment requests while an AI admin filter screens incoming requests for relevance before they reach a human. Built entirely on free-tier services as a solo student project, Rihanyo uses a fallback chain across five AI providers (Cerebras, OpenRouter, Hugging Face, Groq, Gemini) so if one runs dry the system quietly moves to the next."
  },
  {
    github_url: "https://github.com/Hlulani-B/Digital-Logbook",
    overview: "A microservices-based digital logbook application built with a React frontend and four independent Node.js/Express backend services, each running on its own port. The architecture includes an Auth Service for login and signup via Supabase, a Dashboard Service for cross-project summaries and search, a Project Service for entries, timelines, and AI-powered features, and a Profile Service for user profiles and preferences. All four backend services are deployed live on Render with CI/CD pipelines that auto-generate test coverage badges."
  },
  {
    github_url: "https://github.com/Hlulani-B/e-draft",
    overview: "An AI-powered email drafting assistant with a premium, Canva-inspired interface. Type a prompt, get a fully drafted email, and send it directly through your authenticated Gmail account. The app uses an open-source LLM (gpt-oss-20b via Groq) for instantly rephrasing, formalizing, or writing emails from scratch. Built with React and Vite on the frontend, Firebase Google Sign-In for frictionless one-click authentication, and the Gmail API using OAuth 2.0 access tokens captured at login."
  },
  {
    github_url: "https://github.com/Hlulani-B/Cortex",
    overview: "A serverless full-stack app that transforms hours of video and audio lectures, meetings, voice memos, or YouTube videos into clean, structured markdown notes. Drop in an audio or video file, or paste a YouTube link directly, and Cortex uses Gemini 2.5 Flash to generate organized notes from the content. The notes get rendered into a styled PDF you can preview right in the browser or download. Built with React and Vite, Cortex handles MP3, WAV, MP4, and MOV uploads with a 55-minute duration limit."
  },
  {
    github_url: "https://github.com/Hlulani-B/Derma",
    overview: "An AI-powered skin analysis and product recommender that examines your skin in real time through your webcam. Take a photo straight from your browser using WebRTC, and the image gets analysed by Google Gemini 2.5 Flash Lite, which determines your skin type, main concerns, and which ingredients would actually help. It then generates personalised skincare formulation recommendations and searches for real products matching those recommendations, pulling in product images using Cheerio HTML parsing."
  },
  {
    github_url: "https://github.com/Hlulani-B/Dira",
    overview: "A quiet place to keep track of what needs doing. A single-user, local-first task manager built with Next.js 16, React 19, and better-sqlite3. There are no accounts and nothing is deployed anywhere. You clone the repo, run it, and your tasks are stored in a SQLite file on your own machine. Tasks can be tagged with colour-coded topics, move through a three-status workflow (Todo, In Progress, Complete), and are archived rather than deleted. Features computed overdue status, TypeScript type safety, and a Jest test suite."
  },
  {
    github_url: "https://github.com/Hlulani-B/SOS",
    overview: "A covert personal-safety web app for people living with gender-based violence. It hides inside three fully functional everyday apps — a calculator, a weather app, and a clothing boutique — where colour-coded triggers silently record audio, capture video, or send an SOS email with a live GPS pin to the victim's chosen emergency contacts. Privacy is architectural: no accounts, no server, no database — profile and contacts live only in the device's localStorage. Alerts are delivered through the Resend email API via a server-side proxy."
  },
  {
    github_url: "https://github.com/Hlulani-B/SOS_APP",
    overview: "The cloud-backed evolution of Safe, disguised as a plain weather app. Ordinary city chips hide one-tap triggers: Johannesburg starts video, Durban starts audio, Cape Town sends an alert with live location. A second screen plots trusted contacts (pals) sharing their live positions on a South-Africa-bounded map, each resolved to a real street address with the current weather there. The frontend is React 19 + Vite and deliberately router-less. The backend is Express 5 on Neon Postgres behind a generic, allowlisted function dispatcher, with Firebase handling only Google sign-in."
  },
  {
    github_url: "https://github.com/Hlulani-B/Nova",
    overview: "An intelligent CSV cleaning pipeline that takes messy data, has AI write pandas cleaning code, executes it in a subprocess, and repeats until the data is clean. Progress, reports, and generated code stream live via Server-Sent Events. Users can also type plain English instructions like 'remove rows where age is under 18' and the AI applies only that specific change. Built with FastAPI on the backend and React on the frontend, Nova uses Gemini and Groq AI providers with automatic fallback."
  }
];
