# CardioPrep-AI

CardioPrep-AI is a self-hostable, offline-first, voice-interactive cardiology learning platform tailored for postgraduate medical students preparing for the MRCP (UK) exam. Built using React (frontend) and Python (backend), the system uses the **Gemma 3n** LLM locally via **Ollama** to dynamically generate clinically rigorous MCQs and descriptive questions and provide real-time evaluation.

It is designed as a **Progressive Web App (PWA)** that works seamlessly on both desktop and mobile devices—with or without internet access.

---

## Overview

CardioPrep-AI bridges the gap between expensive MRCP prep platforms and students in bandwidth-constrained or resource-limited environments. It offers:

- Adaptive MCQ and descriptive question generation
- Local LLM-powered semantic evaluation
- Offline support using a downloadable backend with Ollama + Gemma 3n
- Full voice interaction (speech-to-text & text-to-speech)
- User performance evaluation with charts and insights
- Works on mobile, desktop, and installable as a PWA

---

## ⚙️ Installation Guide

### Prerequisites

- Python 3.8+
- Node.js v18+
- Ollama (https://ollama.com)

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/CardioPrep-AI.git
cd CardioPrep-AI
2. Backend Setup (Python + Ollama)
bash
Copy
Edit
cd backend
python -m venv venv
# Activate venv
source venv/bin/activate       # macOS/Linux
venv\Scripts\activate          # Windows

# Install Python dependencies
pip install -r requirements.txt
Run Gemma 3n model locally
bash
Copy
Edit
# Install Ollama from https://ollama.com
ollama pull gemma3n:e2b
Start the backend server
bash
Copy
Edit
python app.py
# Server will run on: http://127.0.0.1:5001
3. Frontend Setup (React + Vite)
bash
Copy
Edit
cd ../frontend
npm install
To run locally in dev mode:

bash
Copy
Edit
npm run dev
To build for production:

bash
Copy
Edit
npm run build
To deploy online with Firebase:

bash
Copy
Edit
npx firebase login
npx firebase init hosting
npx firebase deploy
Be sure to set dist as your public directory during Firebase setup.

Usage of Gemma 3n
CardioPrep-AI makes intelligent use of gemma3n:e2b with specially crafted prompts for different use cases:

MCQ Generation: Clinical vignettes with 4 options, dynamically generated based on user history.

Descriptive Questions: Scenario-based open-ended questions requiring critical thinking.

MCQ Evaluation: Detailed reasoning for each choice, correctness labeling, and concept explanation.

Descriptive Evaluation: Semantic assessment with score, explanation, and gap feedback.

All interactions are local via subprocess communication with Ollama.

Creative Highlights
Voice-to-voice interface: speak your answer, hear the question.

History-aware prompts: questions adjust based on user performance.

Adaptive flow: combines MCQ and descriptive practice sessions.

PWA-ready: installable on any device, functions offline.

Auto API switching: detects internet connection and switches to local API if offline.

Minimal setup: one click to download and run the local backend.

📊 Real-World Problems Solved
Problem: No access to expert MRCP resources
Solution: Adaptive, clinically accurate questions generated locally using Gemma 3n.

Problem: No internet in rural or remote areas
Solution: CardioPrep-AI works offline via local Python backend and Ollama.

Problem: MCQs lack detailed feedback
Solution: MCQ feedback includes reasoned explanations for every option using LLM inference.

Problem: Descriptive answers are hard to evaluate
Solution: Gemma 3n provides semantic evaluation and score breakdowns for descriptive answers.

Problem: Existing MCQ platforms are static
Solution: Adaptive difficulty with history-aware prompting makes each session dynamic.

Problem: Subscription costs for AI learning apps
Solution: Fully free and open-source. No API key or online service required.

Problem: Mixed connectivity needs
Solution: CardioPrep-AI works both online and offline, with automatic API switching.

Offline Mode Instructions
Run app.py in the backend folder.

Ensure gemma3n:e2b is pulled via ollama pull.

Open the frontend in browser.

The app detects offline mode and uses http://127.0.0.1:5001 automatically.

From the "Offline" button in Navbar:

Follow instructions

Download Python backend as zip (contains app.py, requirements.txt, readme.txt)

Setup takes < 2 minutes

Note: Offline mode is desktop-only (Ollama not supported on mobile).

Tech Stack
Frontend: React, Vite, TailwindCSS, Chart.js, Web Speech API

Backend: Python Flask + subprocess calls to Ollama

LLM: gemma3n:e2b running locally

Hosting: Firebase (online), or offline via local server

Build Tools: Vite, Firebase CLI

PWA Support: vite-plugin-pwa

License
This project is released for educational and research use. For commercial or institutional deployment, please contact the maintainers.
