import React, { useContext } from "react";

// import the statistical visual evaluation metrics from the rechart
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend } from "recharts";

// import context
import { QnaEvaluateContext } from "../context/QnaEvaluateContext";

const EvaluationModal = ({ onClose }) => {

    const { evaluationResult } = useContext(QnaEvaluateContext);

    if (!evaluationResult) return;

    const mcqScore = evaluationResult?.mcqEvaluate?.mcq_score || 0;
    const descriptiveScore = evaluationResult?.descriptiveEvaluate?.descriptive_score || 0;

    const mcqOverAllScore = evaluationResult?.mcqEvaluate?.overall_score || 0;
    const descriptiveOverAllScore = evaluationResult?.descriptiveEvaluate?.overall_score || 0;
    const overallScore = ((mcqOverAllScore + descriptiveOverAllScore) / 2);

    const barData = [
        { name: "MCQ Score", score: mcqScore },
        { name: "Descriptive Score", score: descriptiveScore }
    ]

    const pieData = [
        { name: "Overall Score", value: overallScore },
        { name: "Remaining", value: 100 - overallScore },
    ]

    const COLORS = ["#D81B60", "#CE93D8"];

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50"
            aria-modal="true"
            role="dialog"
            aria-labelledby="evaluation-modal-title"
            aria-describedby="evaluation-modal-description"
        >
            <div
                className="bg-gradient-to-br from-pink-100/70 via-purple-100/60 to-white/50 
            border border-pink-300/50 backdrop-blur-xl rounded-2xl shadow-2xl w-full md:w-[65vw]
            p-6 max-h-[90vh] overflow-y-auto">
                <header className="flex justify-between items-center mb-6">
                    <h2
                        id="evaluation-modal-title"
                        className="text-2xl font-bold text-white">
                        Quiz Evaluation
                    </h2>
                    <button
                        onClick={onClose}
                        aria-label="Close Evaluation Modal"
                        className="text-pink-700 hover:text-pink-500 text-4xl font-bold">
                        &times;
                    </button>
                </header>


                {/* Charts section */}
                <div className="flex flex-col md:flex-row justify-between gap-8 mb-6">

                    {/* Bar chart */}
                    <div className="flex-1 bg-white/60 backdrop-blur rounded-xl p-4 shadow-md">
                        <h3 className="text-lg font-semibold text-pink-600 mb-2 text-center">
                            Scores Breakdown
                        </h3>
                        <BarChart
                            width={300}
                            height={250}
                            data={barData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            barsize={50}>
                            <XAxis dataKey="name" tick={{ fill: "#AD1457" }} />
                            <YAxis domain={[0, 100]} tick={{ fill: "#AD1457" }} />
                            <Tooltip />
                            <Bar dataKey="score" fill="#D81B60" />
                        </BarChart>
                    </div>

                    {/* Pie chart */}
                    <div className="flex-1 bg-white/60 backdrop-blur rounded-xl p-4 show-md">
                        <h3 className="text-lg font-semibold text-pink-600 mb-2 text-center">
                            Overall Score
                        </h3>
                        <div className="flex justify-center items-center w-full">
                            <PieChart width={300} height={250}>
                                <Pie
                                    data={pieData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={100}
                                    paddingAngle={3}
                                    label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                                >
                                    {pieData.map((entry, idx) => (
                                        <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Legend />
                                <Tooltip />
                            </PieChart>
                        </div>

                    </div>
                </div>

                {/* Feedback Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* MCQ Section */}
                    <div className="bg-white/60 backdrop-blur rounded-xl p-4 shadow-md">
                        <h4 className="text-pink-700 font-semibold mb-2">MCQ Feedback</h4>
                        <ul className="list-disc list-inside max-h-60 overflow-y-auto text-sm text-gray-700">
                            {evaluationResult?.mcqEvaluate?.feedback?.length ? (
                                evaluationResult?.mcqEvaluate.feedback.map((item, idx) => (
                                    <li key={idx} className="mb-1">{item}</li>
                                ))
                            ) : (
                                <li>No feedback Available</li>
                            )}
                        </ul>
                    </div>

                    {/* Descriptive Feedback */}
                    <div className="bg-white/60 backdrop-blur rounded-xl p-4 shadow-md">
                        <h4 className="text-pink-700 font-semibold mb-2">Descriptive Feedback</h4>
                        <ul className="list-disc list-inside max-h-60 overflow-y-auto text-sm text-gray-700">
                            {evaluationResult?.descriptiveEvaluate?.feedback?.length ? (
                                evaluationResult?.descriptiveEvaluate.feedback?.map((item, idx) => (
                                    <li key={idx} className="mb-1">{item}</li>
                                ))
                            ) : (
                                <li>No feedback available.</li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default EvaluationModal;