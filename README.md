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
