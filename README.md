# CardioPrep-AI

CardioPrep-AI is a smart, self-hostable, and voice-interactive cardiology learning platform built for postgraduate medical students preparing for the MRCP (UK) examination. Unlike traditional quiz apps, CardioPrep-AI uses **Gemma 3n**, an open large language model, to dynamically create exam-style questions and evaluate user performance—all without requiring an internet connection.

The app functions as a **Progressive Web App (PWA)** that works across desktop and mobile devices, with an optional **offline Python backend** powered by **Ollama** and **Gemma 3n:e2b**.

---

## 🔍 Overview

CardioPrep-AI bridges the gap between high-cost commercial MRCP preparation tools and learners in bandwidth-constrained environments. By enabling **fully local AI inference**, **voice-based question answering**, and **interactive feedback visualization**, it transforms passive studying into an adaptive, engaging experience.

The system includes:
- MCQ and descriptive question generation with adaptive difficulty
- Automated semantic feedback and scoring
- Voice-to-voice interaction using browser-native APIs
- Offline-first architecture with a downloadable Python backend
- Rich UI feedback with charts and performance summaries

---

## ⚙️ Installation Guide

### Prerequisites

- **Python 3.8+** installed  
- **Node.js (v18+) and npm**  
- **Ollama** installed from: https://ollama.com

---

### 1. Clone the Project

```bash
git clone https://github.com/your-username/CardioPrep-AI.git
cd CardioPrep-AI

---

**## Backend Setup (Python + Ollama)**

cd backend
python -m venv venv
# On Linux/macOS:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

pip install -r requirements.txt
ollama pull gemma3n:e2b
python app.py
