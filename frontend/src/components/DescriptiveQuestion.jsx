import React, { useEffect, useContext, useState } from "react";
import Loader from "./Loader";
import { useSpeechRecognition } from "../customHook/useSpeechRecognition";
import { speakText } from "../Utils/speechSynthesisUtil";
import { Mic, StopCircle } from "lucide-react";
import { QnaEvaluateContext } from "../context/QnaEvaluateContext";

const DescriptiveQuestion = ({
  currentQna,
  userAnswer,
  setUserAnswer,
  submitted,
  handleDescriptiveSubmit,
  setNext,
  isLoading,
}) => {
  const {
    transcript,
    isListening,
    startListening,
    stopListening,
    transcriptRef,
    isSpeakingRef,
    isRecognizingRef,
    shouldListenRef,
    recognitionRef,
    setIsListening,
  } = useSpeechRecognition();

  const {
    showEvaluateButton,
    setShowEvaluateButton,
    evaluationResult,
    showEvaluationModal,
    setShowEvaluationModal,
  } = useContext(QnaEvaluateContext);

  useEffect(() => {

    if (!currentQna?.question || submitted || showEvaluationModal) return;
    if (currentQna?.question_type === "descriptive") {
      speakText(currentQna.question, {
        recognitionRef,
        isRecognizingRef,
        shouldListenRef,
        setIsListening,
        isSpeakingRef,
      });
    }
  }, [currentQna, submitted, showEvaluationModal]);

  useEffect(() => {
    if (!submitted && transcript.trim()) {
      setUserAnswer(transcript.trim());
    }
  }, [transcript, submitted]);

  const handleStop = () => {
    stopListening();
    if (transcriptRef.current.trim()) {
      setUserAnswer(transcriptRef.current.trim());
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <section
          className="w-full bg-white/40 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-[#F48FB1]"
          aria-live="polite"
          aria-atomic="true"
        >
          <p className="font-semibold mb-4">{currentQna.question}</p>

          {!submitted ? (
            <>
              <textarea
                value={userAnswer}
                onChange={(e) => {
                  setUserAnswer(e.target.value);
                  transcriptRef.current = e.target.value;
                }}
                rows={6}
                placeholder="Type or speak your answer here"
                className="w-full border rounded p-3 resize-none focus:outline-blue-500"
                aria-label="Answer input"
              />

              {/* Voice Controls */}
              <div className="flex gap-3 mt-3">
                <button
                  onClick={startListening}
                  disabled={isListening}
                  className={`flex items-center gap-2 px-4 py-2 rounded text-white text-sm ${isListening
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                    }`}
                >
                  <Mic className="w-4 h-4" />
                  Speak
                </button>
                <button
                  onClick={handleStop}
                  disabled={!isListening}
                  className={`flex items-center gap-2 px-4 py-2 rounded text-white text-sm ${!isListening
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700"
                    }`}
                >
                  <StopCircle className="w-4 h-4" />
                  Stop
                </button>
              </div>

              <button
                type="button"
                onClick={handleDescriptiveSubmit}
                disabled={!userAnswer.trim()}
                className={`mt-4 px-6 py-2 rounded text-white ${userAnswer.trim()
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
                  }`}
              >
                Send
              </button>
            </>
          ) : (
            <>
              <div className="mt-3 bg-blue-100 p-4 rounded whitespace-pre-wrap text-right">
                {userAnswer}
              </div>
              {currentQna.expected_answer && (
                <div className="mt-4 text-green-800 bg-green-100 p-4 rounded whitespace-pre-wrap">
                  <strong>Expected Answer</strong>
                  {currentQna.expected_answer}
                </div>
              )}


              {/* Button to generate next question */}
              <button
                type="button"
                onClick={() => {
                  setShowEvaluationModal(false);
                  setShowEvaluateButton(false);
                  setNext(true);
                }}
                className="mt-5 px-6 py-2 rounded-full bg-green-600 hover:bg-green-700 text-white"
              >
                Next Question
              </button>

              {/* Evaluation Button */}
              {showEvaluateButton &&
                !showEvaluationModal && (
                  <button
                    type="button"
                    onClick={() => setShowEvaluationModal(true)}
                    className="mt-4 px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-all"
                  >
                    Show Progression
                  </button>
                )}
            </>
          )}
        </section>
      )}
    </>
  );
};

export default DescriptiveQuestion;
