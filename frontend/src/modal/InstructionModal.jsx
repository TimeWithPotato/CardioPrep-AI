import React from "react";
import { FaBook } from "react-icons/fa";

const InstructionModal = ({ onClose }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm px-2">
            <div
                className="relative bg-gradient-to-br from-pink-100/80 via-purple-100/70 to-white/60 border border-pink-300/60 
                rounded-2xl shadow-2xl w-full max-w-2xl p-6 md:p-8"
            >
                {/* Floating Icon */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex flex-col items-center">
                    <div className="bg-white/90 p-3 rounded-full shadow-md text-pink-700">
                        <FaBook className="text-2xl" />
                    </div>
                    <p className="text-lg mt-1 text-red-700 font-semibold">Instructions</p>
                </div>

                <p className="md:hidden text-sm text-pink-700 font-medium mb-4 mt-5">
                    📌 On mobile, tap the floating <strong>history icon</strong> to access your previous questions and answers.
                </p>
                {/*  Mobile-only instructions */}
                <ul className="list-disc list-inside text-gray-800 space-y-2 text-sm mt-5 max-h-[60vh] overflow-y-auto pr-2 md:hidden">
                    <li>Tap <strong>"Begin Exam"</strong> to start.</li>
                    <li>Use the mic or type to answer descriptive questions.</li>
                    <li>For MCQs, tap an option and then <strong>"Confirm"</strong>.</li>
                    <li>After answering, you can tap <strong>"See Explanation"</strong>.</li>
                    <li>Tap <strong>"Next Question"</strong> to proceed.</li>
                    <li>Access previous questions from the floating <strong>history icon</strong>.</li>
                    <li>Tap <strong>"Show Evaluation"</strong> to track your progress.</li>
                    <li>This app works offline if downloaded properly only for the desktop device.</li>
                </ul>

                {/*  Desktop / tablet instructions */}
                <ul className="hidden md:block list-disc list-inside text-gray-800 space-y-2 text-sm mt-5 max-h-[60vh] overflow-y-auto pr-2">
                    <li>Start the quiz by clicking on <strong>"Begin Exam"</strong>.</li>
                    <li>The left panel displays the current question.</li>
                    <li>The right panel shows all previously answered questions.</li>
                    <li>For MCQs, after submitting your answer, click on <strong>"See Explanation"</strong>.</li>
                    <li>Select the correct option, then press <strong>"Confirm"</strong>.</li>
                    <li>You may type or speak your answer for descriptive questions.</li>
                    <li>Click <strong>"Next Question"</strong> to proceed.</li>
                    <li>Use <strong>"Show Evaluation"</strong> to evaluate your performance.</li>
                    <li>Each question offers explanation or evaluation after submission.</li>
                    <li>This app works offline if downloaded properly only for the desktop device.</li>
                </ul>

                {/* Got it button */}
                <div className="mt-6 flex justify-center max-w-full">
                    <button
                        onClick={onClose}
                        className="bg-pink-600 max-w-screen-lg hover:bg-pink-700 text-white py-2 px-6 rounded-full transition-all"
                    >
                        Got it!
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InstructionModal;