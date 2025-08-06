CardioPrep-AI Local Backend Setup Guide

Thank you for using CardioPrep-AI! This guide will help you set up the Python backend locally to run the app offline with the Gemma 3n model using Ollama.

Step 1: Install Ollama

Please download and install Ollama for your operating system from: https://ollama.com

- Windows: Run the installer and follow the setup instructions.
- macOS: Download the .dmg, open it, and drag Ollama to your Applications folder.
- Linux (Ubuntu): Please visit ollama website for this.

Step 2: Download Gemma 3n Model

Open your terminal (Command Prompt / PowerShell on Windows, Terminal on macOS/Linux) and run:
ollama pull gemma3n:e2b

This downloads the Gemma 3n model locally, required for question generation and evaluation.

Step 3: Prepare Python Environment

Make sure you have Python 3.8 or higher installed.

- Windows: Download Python from https://python.org and install. Be sure to check the box "Add Python to PATH" during installation.
- macOS: Python 3 is usually pre-installed. If needed, install via Homebrew: brew install python
- Linux (Ubuntu): Install Python 3 and required tools by running:
sudo apt update
sudo apt install python3 python3-venv python3-pip

Step 4: Create and Activate Virtual Environment

In the folder containing this app.py and requirements.txt, open terminal and run:

On Windows (Command Prompt):
python -m venv venv
venv\Scripts\activate

On Windows (PowerShell):
python -m venv venv
.\venv\Scripts\Activate.ps1

On macOS / Linux:
python3 -m venv venv
source venv/bin/activate

Once activated, your prompt should show (venv).

Step 5: Install Python Dependencies

Run:
pip install -r requirements.txt

This installs all required Python packages.

Step 6: Run the Backend Server

With the virtual environment activated, start the Flask backend by running:
python app.py

or on macOS/Linux:
python3 app.py

You should see the server running at:
http://127.0.0.1:5000

Step 7: Use the CardioPrep-AI Frontend App

Make sure your frontend app is configured to call the backend API at:
http://127.0.0.1:5000

This enables full offline functionality, with the frontend communicating to the backend running locally on your machine.

Additional Notes:

Keep Ollama running locally with the Gemma 3n model pulled as above.
If you encounter issues, please check your Python and Ollama installations.
This setup avoids any internet requirement after initial setup.
For best performance, ensure your machine meets the system requirements for running Ollama.

Thank you for using CardioPrep-AI!

Developed by Arif Mainuddin for Gemma 3n Impact Challenge.
