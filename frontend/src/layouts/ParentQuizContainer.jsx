import React, { useContext, useState } from "react";
import { QnaEvaluateContext } from "../context/QnaEvaluateContext";

import CurrentQuestionPanel from "../components/CurrentQuestionPanel";
import PreviousQuestionPanel from "../components/PreviousQuestionPanel";
import Evaluate from "../components/Evaluate";

import { FaPlay, FaHistory } from "react-icons/fa"; // 👈 using FaHistory instead of FaBars

const ParentQuizContainer = () => {
    const { showEvaluateButton, showEvaluationModal } = useContext(QnaEvaluateContext);

    const [startExam, setStartExam] = useState(false);
    const [showStartQuizMessage, setShowStartQuizMessage] = useState(true);
    const [showPreviousPanelMobile, setShowPreviousPanelMobile] = useState(false);

    const handleStartExam = () => {
        setStartExam(true);
        setShowStartQuizMessage(false);
    };

    return (
        <>
            {/* Show evaluation modal */}
            {showEvaluateButton && showEvaluationModal && <Evaluate />}

            <main className="bg-[#F8BBD0] min-h-screen p-4 relative">
                {/* Mobile: Toggle Previous Panel */}
                <div className="md:hidden fixed top-4 left-4 z-50 flex flex-col items-center">
                    <button
                        onClick={() => setShowPreviousPanelMobile(!showPreviousPanelMobile)}
                        className="bg-[#D81B60] text-white p-3 rounded-full shadow-lg hover:bg-[#EC407A] transition"
                    >
                        <FaHistory className="text-xl" />
                    </button>
                    <span className="text-sm mt-1 text-red-600 font-semibold">History</span>
                </div>

                {/* Start Quiz Button */}
                <section className="flex justify-center items-center mt-6">
                    {!startExam && showStartQuizMessage && (
                        <button
                            onClick={handleStartExam}
                            className="flex items-center gap-2 px-6 py-3 bg-[#D81B60] text-white rounded-full hover:bg-[#EC407A] shadow-md transition"
                        >
                            <FaPlay />
                            Begin Exam
                        </button>
                    )}
                </section>

                <div className="flex flex-col min-h-screen">
                    <section className="flex flex-col md:flex-row justify-around gap-4 mt-5 items-start">
                        {/* ✅ CurrentQuestionPanel - desktop & mobile */}
                        <aside
                              className="relative w-full md:w-2/6 flex-grow min-h-[500px] 
                                        bg-white/30 backdrop-blur-lg rounded-2xl p-4 
                                        shadow-xl border border-[#F06292] overflow-y-auto 
                                        transition-all duration-300 ease-in-out"
                        >
                            {!startExam && showStartQuizMessage && (
                                <div className="text-center text-gray-600">
                                    <section className="w-2/3 max-w-3xl text-center p-4 text-white">
                                        <p>Press "Start Quiz" to begin.</p>
                                    </section>
                                </div>
                            )}

                            <CurrentQuestionPanel
                                startExam={startExam}
                                setStartExam={setStartExam}
                            />
                        </aside>

                        {/* ✅ PreviousQuestionPanel - desktop only */}
                        <aside
                            className="w-full md:w-2/5 max-h-[90vh] overflow-y-hidden
              hidden md:block bg-white/30 backdrop-blur-lg rounded-2xl p-4 
              shadow-xl border border-[#F06292]"
                        >
                            <PreviousQuestionPanel />
                        </aside>

                        {/* ✅ PreviousQuestionPanel - mobile modal */}
                        {showPreviousPanelMobile && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-2xl p-4 md:hidden">
                                <div className="relative w-full max-w-2xl bg-white/60 backdrop-blur-xl rounded-2xl shadow-2xl p-6 overflow-y-auto max-h-[90vh] border border-pink-200">
                                    {/* Close Button */}
                                    <button
                                        onClick={() => setShowPreviousPanelMobile(false)}
                                        className="absolute top-4 right-4 z-50 bg-white bg-opacity-95 
                                                 text-pink-700 hover:text-pink-900 font-semibold 
                                                 rounded-full px-4 py-2 shadow-lg ring-2 ring-pink-500 
                                                transition duration-200 ease-in-out hover:scale-105
                                                focus:outline-none focus:ring-4 focus:ring-pink-400"
                                    >
                                        ✕ Close
                                    </button>

                                    <PreviousQuestionPanel />
                                </div>
                            </div>
                        )}
                    </section>
                </div>
            </main>
        </>
    );
};

export default ParentQuizContainer;
