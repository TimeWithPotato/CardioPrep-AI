import React, { useContext } from "react";
import { QnaHistoryContext } from "../context/QnaHistoryContext";
import { ShowExplanationsContext } from "../context/ShowExplanationsContext";

const PreviousQuestionPanel = () => {
  const { qnaHistory } = useContext(QnaHistoryContext);
  const { showExplanations, setShowExplanations } = useContext(
    ShowExplanationsContext
  );

  const toggleExplanation = (key) => {
    setShowExplanations((prev) =>
      prev === `prev-${key}` ? null : `prev-${key}`
    );
  };

  return (
    <div className="min-w-96 h-auto min-h-[75vh] max-h-[90dvh] overflow-y-auto space-y-4 px-3 py-2 bg-white/30 backdrop-blur-lg  rounded-2xl shadow-xl">
      <h2 className="text-xl font-bold mb-2 text-[#D81B60] text-center bg-gradient-to-r from-[#F06292] to-[#D81B60] text-transparent bg-clip-text">
        Previous Questions and Answers
      </h2>

      {qnaHistory.length === 0 ? (
        <p className="text-gray-300 text-center">No previous questions yet.</p>
      ) : (
        qnaHistory.map((qna, index) => (
          <div
            key={index}
            className="bg-white/80 text-black shadow-lg p-4 rounded-xl border border-[#F48FB1]"
          >
            <p className="font-medium mb-2">{qna.question}</p>

            {/* ---------------- MCQ ---------------- */}
            {qna.type === "mcq" ? (
              <ul className="space-y-2 mb-2">
                {qna.options.map((opt, idx) => {
                  const key = opt[0];
                  const isCorrect = key === qna.correctAnswer;
                  const isUserAnswer = key === qna.userAnswer;

                  let style =
                    "px-2 py-1 rounded cursor-pointer border transition-all ";
                  if (isCorrect) style += "bg-green-100 border-green-400";
                  else if (isUserAnswer) style += "bg-red-100 border-red-400";
                  else style += "bg-gray-100 border-gray-200";

                  return (
                    <li key={idx} className={style}>
                      {opt}
                      {isUserAnswer && " (Your Answer)"}
                      {isCorrect && " ✅"}

                      {/* ✅ Explanation Toggle per option */}
                      {qna.explanation?.[key] && (
                        <div className="mt-1">
                          <button
                            onClick={() => toggleExplanation(`${index}-${key}`)}
                            className="text-sm text-blue-600 underline"
                          >
                            {showExplanations === `prev-${index}-${key}`
                              ? "Hide Explanation"
                              : "Show Explanation"}
                          </button>
                          {showExplanations === `prev-${index}-${key}` && (
                            <div className="text-sm mt-1 text-gray-700">
                              {qna.explanation[key]}
                            </div>
                          )}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : (
              // ---------------- Descriptive ----------------
              <div className="mb-2 grid grid-cols-2 gap-2 items-start">
                <div className="bg-gray-100 p-2 rounded-md">
                  <p className="text-xs font-semibold text-gray-600 mb-1">
                    Expected Answer:
                  </p>
                  <p className="text-sm text-green-800 italic whitespace-pre-wrap">
                    {qna.expectedAnswer || "N/A"}
                  </p>
                </div>

                <div className="bg-blue-100 p-2 rounded-md text-right">
                  <p className="text-xs font-semibold text-gray-600 mb-1">
                    Your Answer:
                  </p>
                  <p className="text-sm text-gray-800 italic whitespace-pre-wrap">
                    {qna.userAnswer}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default PreviousQuestionPanel;
