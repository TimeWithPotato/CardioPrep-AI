# CardioPrep-AI

CardioPrep-AI is a smart, self-hostable, and voice-interactive cardiology learning platform built for postgraduate medical students preparing for the MRCP (UK) examination. Unlike traditional quiz apps, CardioPrep-AI uses **Gemma 3n**, an open large language model, to dynamically create exam-style questions and evaluate user performance—all without requiring an internet connection.

The app functions as a **Progressive Web App (PWA)** that works across desktop and mobile devices, with an optional **offline Python backend** powered by **Ollama** and **Gemma 3n:e2b**.

---

## Overview

CardioPrep-AI bridges the gap between high-cost commercial MRCP preparation tools and learners in bandwidth-constrained environments. By enabling **fully local AI inference**, **voice-based question answering**, and **interactive feedback visualization**, it transforms passive studying into an adaptive, engaging experience.

The system includes:
- MCQ and descriptive question generation with adaptive difficulty
- Automated semantic feedback and scoring
- Voice-to-voice interaction using browser-native APIs
- Offline-first architecture with a downloadable Python backend
- Rich UI feedback with charts and performance summaries

---

## ⚙️ Installation Guide

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/CardioPrep-AI.git
cd CardioPrep-AI
```

---

### 2. Backend Setup (Python + Ollama)

```bash
cd backend
python -m venv venv
```

#### Activate Virtual Environment

- On macOS/Linux:

  ```bash
  source venv/bin/activate
  ```

- On Windows:

  ```bash
  venv\Scripts\activate
  ```

#### Install Dependencies

```bash
pip install -r requirements.txt
```

---

### 3. Run Gemma 3n Locally

```bash
# Install Ollama (https://ollama.com)
ollama pull gemma3n:e2b
```

Start the backend server:

```bash
python app.py
# Runs at http://127.0.0.1:5001
```

---

### 4. Frontend Setup (React + Vite)

```bash
cd ../frontend
npm install
```

#### To run locally:

```bash
npm run dev
```

#### To build for production:

```bash
npm run build
```

---

### 5. Deploy Online with Firebase

```bash
npx firebase login
npx firebase init hosting
npx firebase deploy
```

> During Firebase setup, select `dist` as the public directory and enable single-page app support.

---

## Usage of Gemma 3n

CardioPrep-AI uses `gemma3n:e2b` with specially crafted prompts for:

- **MCQ Generation**  
  - Clinical vignettes with four options  
  - Dynamically generated based on user history  

- **Descriptive Questions**  
  - Realistic, open-ended scenarios  
  - Requires detailed clinical reasoning  

- **MCQ Evaluation**  
  - LLM evaluates correctness  
  - Provides explanation for all choices  

- **Descriptive Evaluation**  
  - Semantic scoring with justification  
  - Returns structured, concise feedback  

> All logic is handled locally via subprocess interaction with Ollama.

---

## Creative Highlights

- Voice-to-voice interaction using browser-native APIs  
- Adaptive difficulty using user history context  
- Mixed quiz types: MCQ + descriptive in one flow  
- Mobile-friendly PWA with offline-first architecture  
- Automatic API switching for online/offline use  
- Downloadable backend package for running Gemma 3n locally  

---

## Real-World Problems Solved

- **Problem**: Limited access to expert MRCP resources  
  **Solution**: Adaptive, locally-generated questions using Gemma 3n

- **Problem**: No internet in rural/remote areas  
  **Solution**: Works 100% offline using Ollama

- **Problem**: MCQs lack reasoning feedback  
  **Solution**: Detailed explanation returned per option

- **Problem**: Descriptive answers are hard to assess  
  **Solution**: Semantic LLM evaluation with scores and feedback

- **Problem**: Static MCQ banks  
  **Solution**: History-aware prompting with dynamic difficulty

- **Problem**: Expensive AI subscriptions  
  **Solution**: Entirely free and open-source, no key required

- **Problem**: Mixed internet availability  
  **Solution**: Automatically detects and runs in offline/online mode

---

## Offline Mode Instructions

1. Run `app.py` from the `backend` folder  
2. Ensure `gemma3n:e2b` is installed with `ollama pull`  
3. Open the frontend app in your browser  
4. The app will switch to `http://127.0.0.1:5001` when offline  
5. From the "Offline" button in Navbar:
    - Download the Python backend ZIP  
    - Follow in-app instructions to run locally  

> Offline mode is supported on desktop only (Ollama doesn’t run on mobile).

---

## Tech Stack

- **Frontend**: React, Vite, TailwindCSS, Chart.js  
- **Backend**: Python Flask + subprocess  
- **LLM**: `gemma3n:e2b` via Ollama  
- **Hosting**: Firebase (online), local server (offline)  
- **Build Tools**: Vite, Firebase CLI  
- **Voice**: Web Speech API  
- **PWA**: Offline-capable, installable web app  

---

## License

This project is intended for academic, research, and personal use only. For institutional or commercial deployment, please contact the maintainers.
