from multiprocessing import process
from re import sub
import re
from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
import json
import unicodedata
import hashlib

app = Flask(__name__)
CORS(app)

PROMPT_QUIZ = """
You are an expert AI cardiology tutor specialized in preparing students for the MRCPUK examination.

Your task is to conduct an adaptive, hard level sometime, interactive cardiology quiz session tailored to postgraduate medical students.


Follow these rules strictly and generate questions based on MRCPUK exam.

-------------------------------
RULES
-------------------------------

1. Quiz Objective:
   - Assess and enhance the student's cardiology knowledge at a challenging MRCPUK postgraduate level.
   - Use structured, evidence-based, clinical case scenarios reflecting MRCP-style reasoning.

2. Question Types:
   - Default question format: MCQ.
   - Occasionally insert descriptive questions to assess deeper clinical reasoning.
   - Use "question_type": "mcq" for MCQs questions.

3. MCQ Structure:
   - Present realistic clinical vignettes including presentations such as heart failure, valvular disease, arrhythmias, ischaemia, ECG interpretation, and murmurs.
   -Test diagnosis, management, investigations, pharmacology, pathophysiology, risk factors, prognosis, complications, and prevention
   -Include common and rare presentations with varied complexity
   -Combine multiple clinical data for interpretation questions
   -Prioritise next best steps in management or investigations
   - Questions should test diagnosis, management, investigations, or pharmacology.
   - Provide exactly 5 plausible answer options labeled A to E.
   - Include an "explanation" object with each keys A to E explaining why each option is correct or incorrect.



4. Answer Marking:
   - For MCQs, use "correct_answer": "X" where X is A-E.

5. Formatting:
   - Return strictly one valid JSON object per interaction.
   - Use British English and clinical terminology.
   - No additional commentary or text outside the JSON response.

6. Clearly specify the question type ("mcq").

7. Generate new and unique, original questions each time, any question that found match in the "history" should not be generated once again, so check the "history".


8. ***** Ensure JSON is valid and close all arrays. *****


9. "options" is an array of strings with 5 options for MCQs, and null for descriptive questions, "explanation" is an object with keys A to E for MCQs, and null for descriptive questions.

10. Dynamically adjust the difficulty based on the student's performance history, given in the "history" and do not repeat any question from the history.


Any deviation or failure to comply will be considered a critical error.
Failure to follow the exact output format and rules **will result in penalties** and **immediate rejection** of your response.
Now generate a question based on the above rules and following the format:

------------------------------
history
------------------------------
{history}

-------------------------------
OUTPUT FORMAT (strict JSON only)
-------------------------------
For mcq:
```json
{{
"question_type": "mcq",
"question": question,
"options": [
  "A. First option",
  "B. Second option",
  "C. Third option",
  "D. Fourth option",
  "E. Fifth option"
 ],
"correct_answer": correct_answer among the options A to E,
"explanation": {{
    "A": explanation for option A,
    "B": explanation for option B,
    "C": explanation for option C,
    "D": explanation for option D,
    "E": explanation for option E
    }}
}}
"""

PROMPT_DESCRIPTIVE = """
You are an expert AI cardiology tutor specialized in preparing students for the MRCPUK examination.
Your task is to conduct an adaptive, hard level sometime, interactive cardiology quiz session tailored to postgraduate medical students.
Follow these rules strictly and generate questions based on MRCPUK exam.
-------------------------------
RULES
-------------------------------
1. Descriptive Question Objective:
   - Assess the student's ability to reason through complex clinical scenarios.
    - Use detailed clinical case vignettes requiring diagnostic and management reasoning.
2. Question Structure:
    -Present realistic clinical vignettes including presentations such as heart failure, valvular disease, arrhythmias,            ischaemia, ECG interpretation, and murmurs; test diagnosis, management, investigations, pharmacology, pathophysiology, risk factors, prognosis, complications, and prevention; include common and rare presentations with varied complexity; combine multiple clinical data for interpretation questions; prioritise next best steps in management or investigations
   - Ask an open-ended question requiring diagnostic and management reasoning.
3. Descriptive Question Structure:
   - Present detailed clinical case vignettes.
   - Ask an open-ended question requiring diagnostic and management reasoning.
   - Include keys:
   - "question_type": "descriptive"
   - "expected_answer": a comprehensive, well-reasoned medical explanation.
   - Set "options", "correct_answer"  and "explanation" to null.
4. Formatting:
   - Return strictly one valid JSON object per interaction.
    - Use British English and clinical terminology. 
    - No additional commentary or text outside the JSON response.
5. Clearly specify the question type ("descriptive").
6. ***** Ensure JSON is valid and close all arrays. *****
7. ** ADDITIONAL RULES:
    - Generate new and unique, original questions each time.
 
8. ***** Ensure JSON is valid and close all arrays. *****
9. Dynamically adjust the difficulty based on the student's performance history, given in the "history" and do not repeat any question from the history.

Any deviation or failure to comply will be considered a critical error.
Failure to follow the exact output format and rules **will result in penalties** and **immediate rejection** of your response.

------------------------------
history
------------------------------
{history}


Now generate a question based on the above rules and following the format:
-------------------------------
OUTPUT FORMAT (strict JSON only)
-------------------------------
```json
{{
  "question_type": "descriptive",
  "question": question,
  "expected_answer": expected_answer,
  "options": null,
  "correct_answer": null,
  "explanation": null,
  "finish": false
}}
"""

MCQ_EVALUATION_PROMPT = """
You are an ill-tempered and an experienced MRCPUK examiner.

Your job is to evaluate very strictly and tightly the student's overall performance based on the mcq and its correctAnswer and userAnswer.These are provided below in the Exam History.

====================
Exam History:
{history}
====================

EVALUATION CRITERIA:
1. mcq_score (0-100)
3. overall_score (0-100)
4. Feedback:  A short, bullet-point list of sarcastic, harsh, or brutally honest criticisms (or rare praises if deserved).
5. set "descriptive_score", "overall_score", "feedback" null if the "history" is empty.



Any deviation or failure to comply will be considered a critical error.
Failure to follow the exact output format and rules **will result in penalties** and **immediate rejection** of your response.

====================
OUTPUT FORMAT (STRICT JSON):
{{ 
  "mcq_score": 0-100,
  "overall_score": 0-100,
  "feedback": [
    "Point 1",
    "Point 2",
    ...
  ]
}}

**Do not include any explanation, greeting, or commentary. Only respond with a valid JSON block as shown above.**
**No markdown, no header, just pure JSON.**
"""

DESCRIPTIVE_EVALUATION_PROMPT = """
You are an ill-tempered and an experienced MRCPUK examiner.
Your job is to evaluate very strictly and tightly the student overall performance based on the descriptive questions and its expectedAnswer and userAnswer. These are provided below in the Exam History.
====================
Exam History:
{history}
====================
EVALUATION CRITERIA:
1. descriptive_score (0-100)
2. overall_score (0-100)
3. Feedback:  A short, bullet-point list of sarcastic, harsh, or brutally honest criticisms (or rare praises if deserved).
4. set "descriptive_score", "overall_score", "feedback" null if the "history" is empty.


Any deviation or failure to comply will be considered a critical error.
Failure to follow the exact output format and rules **will result in penalties** and **immediate rejection** of your response.

====================
OUTPUT FORMAT (STRICT JSON):
```json
{{
    "descriptive_score": 0-100,
    "overall_score": 0-100,
    "feedback": [
        "Point 1",
        "Point 2",
        ...
    ]
}}
**Do not include any explanation, greeting, or commentary. Only respond with a valid JSON block as shown above.**
**No markdown, no header, just pure JSON.**
"""

# =======================
# HASHING UTILITY
# =======================
def generate_question_id(question_text):
    return hashlib.sha256(question_text.encode("utf-8")).hexdigest()


# =======================
# HELPERS
# =======================

def balance_brackets(s):
    counts = {"{": s.count("{"), "}": s.count("}"), "[": s.count("["), "]": s.count("]"), "(": s.count("("), ")": s.count(")")}
    if counts["{"] > counts["}"]: s += "}" * (counts["{"] - counts["}"])
    if counts["["] > counts["]"]: s += "]" * (counts["["] - counts["]"])
    if counts["("] > counts[")"]: s += ")" * (counts["("] - counts[")"])
    return s

def extract_json(text):
    if not isinstance(text, str):
        raise ValueError("extract_json() received non-string input")
    text = unicodedata.normalize("NFKC", text).strip()
    text = re.sub(r"```json|```", "", text)
    start, stack, candidates = None, [], []

    for i, c in enumerate(text):
        if c == "{":
            if not stack:
                start = i
            stack.append(c)
        elif c == "}":
            if stack:
                stack.pop()
                if not stack and start is not None:
                    candidates.append(text[start: i + 1])
                    start = None

    for candidate in reversed(candidates):
        try:
            candidate_fixed = re.sub(r",\s*([}\]])", r"\1", candidate)
            candidate_fixed = balance_brackets(candidate_fixed)
            parsed = json.loads(candidate_fixed)
            if isinstance(parsed, dict) and "question_type" in parsed:
                return parsed
        except json.JSONDecodeError:
            continue

    raise ValueError("No valid JSON object with 'question_type' found.")

def extract_json_for_eval(text):
    if not isinstance(text, str):
        raise ValueError("extract_json_for_eval() received non-string input")
    text = unicodedata.normalize("NFKC", text).strip()
    text = re.sub(r"```json|```", "", text)
    start, stack, candidates = None, [], []

    for i, c in enumerate(text):
        if c == "{":
            if not stack:
                start = i
            stack.append(c)
        elif c == "}":
            if stack:
                stack.pop()
                if not stack and start is not None:
                    candidates.append(text[start: i + 1])
                    start = None

    for candidate in reversed(candidates):
        try:
            candidate_fixed = re.sub(r",\s*([}\]])", r"\1", candidate)
            candidate_fixed = balance_brackets(candidate_fixed)
            candidate_fixed = candidate_fixed.replace("feeebaack", "feedback")
            parsed = json.loads(candidate_fixed)
            if isinstance(parsed, dict):
                return parsed
        except json.JSONDecodeError:
            continue

    raise ValueError("No valid JSON object for eval.")

def run_ollama(prompt):
    try:
        process = subprocess.Popen(
            ["ollama", "run", "gemma3n:e2b"],
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            encoding="utf-8",
        )
        output, error = process.communicate(input=prompt, timeout=120)
        print("Ollama output:", output)
        return output.strip()
    except Exception as e:
        return json.dumps({"error": str(e)})

def regenerate_until_valid_json(prompt, max_retries=5):
    for attempt in range(max_retries):
        raw_output = run_ollama(prompt)
        try:
            parsed = extract_json(raw_output)
            if parsed:
                return parsed
        except Exception as e:
            print(f"Attempt {attempt + 1}: extract_json failed with error: {e}")
    return {"error": "Failed to get valid JSON after retries"}

def regenerate_until_valid_json_for_eval(prompt, max_retries=3):
    for attempt in range(max_retries):
        raw_output = run_ollama(prompt)
        try:
            parsed = extract_json_for_eval(raw_output)
            if parsed:
                return parsed
        except Exception as e:
            print(f"Attempt {attempt + 1}: extract_json_for_eval failed: {e}")
    return {"error": "Failed to get valid JSON after retries"}

# =======================
# API ROUTES
# =======================

@app.route("/api/quiz", methods=["POST"])
def quiz():
    data = request.json
    mcqCount = data.get("mcqCount", 0)
    mcqHistory = data.get("mcqHistory", [])
    descriptiveHistory = data.get("descriptiveHistory", [])

    existing_question_ids = set(
        generate_question_id(q["question"]) for q in (mcqHistory + descriptiveHistory)
    )

    max_attempts = 5
    for attempt in range(max_attempts):
        prompt = (
            PROMPT_QUIZ.format(history=json.dumps(mcqHistory, indent=2))
            if mcqCount < 2
            else PROMPT_DESCRIPTIVE.format(history=json.dumps(descriptiveHistory, indent=2))
        )

        response_json = regenerate_until_valid_json(prompt)
        if "question" not in response_json:
            return jsonify({"error": "Invalid model response", "raw": response_json})

        # Generate hash for this question
        question_text = response_json["question"]
        question_id = generate_question_id(question_text)

        if question_id not in existing_question_ids:
            response_json["question_id"] = question_id
            return jsonify(response_json)
        else:
            print(f"Duplicate question detected (attempt {attempt + 1}). Regenerating...")

    return jsonify({"error": "Failed to generate unique question after retries"})

@app.route("/api/evaluate", methods=["POST"])
def evaluate():
    data = request.json
    if "mcqEvaluate" in data:
        history = data["mcqEvaluate"]
        if not history:
            return jsonify({"mcq_score": 0, "overall_score": 0, "feedback": []})
        prompt = MCQ_EVALUATION_PROMPT.format(history=json.dumps(history, indent=2))
    elif "descriptiveEvaluate" in data:
        history = data["descriptiveEvaluate"]
        if not history:
            return jsonify({"descriptive_score": 0, "overall_score": 0, "feedback": []})
        prompt = DESCRIPTIVE_EVALUATION_PROMPT.format(history=json.dumps(history, indent=2))
    else:
        return jsonify({"error": "Invalid evaluation type."}), 400

    try:
        response_json = regenerate_until_valid_json_for_eval(prompt)
    except Exception as e:
        return jsonify({"error": "Evaluation error", "details": str(e)}), 500

    return jsonify(response_json)

if __name__ == "__main__":
    app.run(port=5001, debug=True)
