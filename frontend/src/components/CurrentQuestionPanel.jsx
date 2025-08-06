import React, { use, useContext, useEffect, useState } from "react";
// *** import all the context ***
import { QnaHistoryContext } from "../context/QnaHistoryContext";
import { QnaEvaluateContext } from "../context/QnaEvaluateContext";
import { ShowExplanationsContext } from "../context/ShowExplanationsContext";
import { LoaderContext } from "../context/LoaderContext";

import { speakText } from "../Utils/speechSynthesisUtil";
import { useSpeechRecognition } from "../customHook/useSpeechRecognition";
import getApiBaseUrl from "../Utils/getApiBaseUrl";

// *** import other component ***
import Loader from "./Loader";
import DescriptiveQuestion from "./DescriptiveQuestion";
import Evaluate from "./Evaluate";
const CurrentQuestionPanel = ({ startExam, setStartExam }) => {
  // all context
  const { setQnaHistory } = useContext(QnaHistoryContext);
  const {
    setMcqEvaluate ,
    setDescriptiveEvaluate,
    showEvaluateButton,
    setShowEvaluateButton,
    showEvaluationModal,
    setShowEvaluationModal,
  } = useContext(QnaEvaluateContext);

  const { isLoading, setIsLoading } = useContext(LoaderContext)

  const { showExplanations, setShowExplanations } = useContext(
    ShowExplanationsContext
  );


  // all state
  const [next, setNext] = useState(false);
  const [currentQna, setCurrentQna] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [selectedOption, setSelectedOption] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [mcqCount, setMcqCount] = useState(0);
  const [mcqHistory, setMcqHistory] = useState([]);
  const [descriptiveHistory, setDescriptiveHistory] = useState([]);

  const {
    recognitionRef,
    isRecognizingRef,
    shouldListenRef,
    setIsListening,
    isSpeakingRef,
  } = useSpeechRecognition();

  // speak the question when it loads
  useEffect(() => {
    if (!currentQna?.question || submitted || showEvaluationModal) return;

    if (currentQna.question_type === "mcq") {
      const textToSpeak = `${currentQna.question
        }. Options are ${currentQna.options
          .map((opt) => `Option ${opt[0]} is ${opt.slice(3).trim()}`)
          .join(", ")}`;

      speakText(textToSpeak, {
        recognitionRef,
        isRecognizingRef,
        shouldListenRef,
        setIsListening,
        isSpeakingRef,
      });
    }
  }, [currentQna, submitted, showEvaluationModal]);

  // fetch the question
  useEffect(() => {
    if (!next && !startExam) return;
    console.log("Fetching question...");
    const fetchQuestion = async () => {
      setCurrentQna([]);
      setIsLoading(true);
      console.log("hit");
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/quiz`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mcqCount: mcqCount,
            mcqHistory: mcqHistory,
            descriptiveHistory: descriptiveHistory,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.log(errorData.message);
          throw new Error(
            errorData.message || errorData.error || "Unknown error"
          );
        }

        const data = await response.json();
        console.log("Received question:", data);

        if (mcqCount <= 2) {
          setMcqCount((prev) => prev + 1);
        } else {
          setMcqCount(0);
        }

        // set each relevant state and context

        setCurrentQna(data);
        setSubmitted(false);
        setShowEvaluateButton(false);
        setSelectedOption(null);
        setUserAnswer("");
        setShowExplanations({});
      } catch (error) {
        alert("Quiz error: ", error.message);
        console.log(error);
      } finally {
        setNext(false);
        setStartExam(false);
        setIsLoading(false);
      }
    };

    if (next || startExam) fetchQuestion();
  }, [next, startExam]);

  // For toggling explanations
  const toggleExplanation = (key) => {
    setShowExplanations((prev) =>
      prev === `curr-${key}` ? null : `curr-${key}`
    );
  };

  // handle mcq submit
  const handleMCQSubmit = () => {
    if (!selectedOption) return;
    setSubmitted(true);
    setShowEvaluateButton(true);
    setShowEvaluationModal(false);

    const record = {
      type: "mcq",
      question: currentQna.question,
      options: currentQna.options,
      correctAnswer: currentQna.correct_answer,
      explanation: currentQna.explanation,
      userAnswer: selectedOption,
    };

    setQnaHistory((prev) => [...prev, record]);

    // setQnaEvaluate((prev) => [
    //   ...prev,
    //   {
    //     type: "mcq",
    //     question: currentQna.question,
    //     options: currentQna.options,
    //     correctAnswer: currentQna.correct_answer,
    //     userAnswer: selectedOption,
    //   },
    // ]);

    setMcqEvaluate((prev) => [
      ...prev,
      {
        question: currentQna.question,
        correctAnswer: currentQna.correct_answer,
        userAnswer: selectedOption,
      },
    ]);

    setMcqHistory((prev) => [...prev, record]);
  };

  // handle descriptive submit
  const handleDescriptiveSubmit = () => {
    if (!userAnswer.trim()) return;
    setSubmitted(true);
    setShowEvaluateButton(true);
    setShowEvaluationModal(false);

    const record = {
      type: "descriptive",
      question: currentQna.question,
      expectedAnswer: currentQna.expected_answer || null,
      userAnswer: userAnswer.trim(),
    };

    setQnaHistory((prev) => [...prev, record]);

    // setQnaEvaluate((prev) => [...prev, record]);
    setDescriptiveEvaluate((prev) => [
      ...prev,
      {
        question: currentQna.question,
        expectedAnswer: currentQna.expected_answer || null,
        userAnswer: userAnswer.trim(),
      },
    ]);

    setDescriptiveHistory((prev) => [...prev, record]);
  };

  return (
    <>

      {/* loading overlay */}
      {isLoading && <Loader />}

      {/* MCQ render */}

      {(currentQna.question_type === "mcq") && (!isLoading) && (
        <section
          className="w-full bg-white/40 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-[#F48FB1]"
          aria-live="polite"
          aria-atomic="true"
        >
          <p className="font-semibold mb-4">{currentQna.question}</p>
          {currentQna.options.map((opt, idx) => {
            const key = opt[0];
            const isCorrect = currentQna.correct_answer === key;
            const isSelected = selectedOption === key;

            let bgClass = "bg-gray-100";
            if (submitted) {
              if (isCorrect) bgClass = "bg-green-200";
              else if (isSelected && !isCorrect) bgClass = "bg-red-200";
            } else if (isSelected) bgClass = "bg-blue-200";

            return (
              <div
                key={idx}
                className={`p-3 mt-2 rounded cursor-pointer select-none ${bgClass}`}
                onClick={() => !submitted && setSelectedOption(key)}
                role="radio"
                aria-checked={isSelected}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (!submitted && (e.key === "Enter" || e.key === " ")) {
                    setSelectedOption(key);
                  }
                }}
              >
                {opt}

                {/* Show explanation toggle button if submitted */}

                {submitted && currentQna.explanation?.[key] && (
                  <div className="mt-2">
                    <button
                      onClick={() => toggleExplanation(key)}
                      className="text-sm text-blue-600 underline"
                      aria-expanded={showExplanations === `curr-${key}`}
                      aria-controls={`current-explanation-${key}`}
                    >
                      {showExplanations === `curr-${key}`
                        ? "Hide Explanation"
                        : "See Explanation"}
                    </button>
                    {showExplanations === `curr-${key}` && (
                      <div
                        id={`current-explanation-${key}`}
                        className="text-sm mt-1 text-gray-700"
                      >
                        {currentQna.explanation[key]}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {/* Submit button */}
          {!submitted ? (
            <button
              type="button"
              onClick={handleMCQSubmit}
              className={`mt-5 px-6 py-2 rounded-full text-white self-end shadow-md transition-all ${selectedOption
                ? "bg-[#EC407A] hover:bg-[#D81B60]"
                : "bg-gray-400 cursor-not-allowed"
                }`}
            >
              Confirm
            </button>
          ) : (
            // Next button
            <button
              type="button"
              onClick={() => {
                setShowEvaluationModal(false);
                setShowEvaluateButton(false);
                setNext(true);
              }}
              className="mt-5 px-6 py-2 bg-green-600 hover:bg-green-700 rounded-full text-white self-end shadow-md transition-all"
            >
              Next Question
            </button>
          )}

          {/* Evaluation */}

          {showEvaluateButton && !showEvaluationModal && (
            <button
              type="button"
              onClick={() => setShowEvaluationModal(true)}
              className="mt-4 px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-all"
            >
              Show Progression
            </button>
          )}
        </section>
      )}


      {/* Descriptive question render */}
      {(currentQna.question_type === "descriptive") && (!isLoading) && (
        <DescriptiveQuestion
          currentQna={currentQna}
          userAnswer={userAnswer}
          setUserAnswer={setUserAnswer}
          submitted={submitted}
          handleDescriptiveSubmit={handleDescriptiveSubmit}
          setNext={setNext}
          isLoading={isLoading}
          show
        />
      )}
    </>
  )
};

export default CurrentQuestionPanel;
