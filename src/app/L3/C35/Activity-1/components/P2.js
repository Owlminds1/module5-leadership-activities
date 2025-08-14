'use client';

import { useState } from 'react';

const problems = [
    {
        id: 'oceans',
        title: "A way to clean up plastic in oceans quickly.",
        questions: [
            "Can you think of a creature that gathers or collects things from water?",
            "Is there a sea creature that filters or stores stuff?",
            "How do whales or jellyfish eat their food?",
            "What creature scoops or filters tiny things out of water?",
        ]
    },
    {
        id: 'shoes',
        title: "Shoes that grip even on slippery surfaces.",
        questions: [
            "What structures in nature stand firm against wind?",
            "How do trees or plants bend but not break?",
            "How do animals build shelters in windy places?"
        ]
    }
];

export default function BiomimicryForKids() {
    const [selectedProblemId, setSelectedProblemId] = useState(null);
    const [currentQIndex, setCurrentQIndex] = useState(0);

    const selectedProblem = problems.find(p => p.id === selectedProblemId);

    const handleProblemClick = (id) => {
        if (!selectedProblemId) {
            setSelectedProblemId(id);
            setCurrentQIndex(0);
        }
    };

    const handleNextQuestion = () => {
        if (
            selectedProblem &&
            currentQIndex < selectedProblem.questions.length - 1
        ) {
            setCurrentQIndex(currentQIndex + 1);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-blue-100 p-6 flex flex-col items-center">
            <h1 className="text-3xl font-extrabold text-center text-blue-700 mb-6 drop-shadow-lg">
                Biomimicry Inspiration Station
            </h1>

            {/* LHS: Problem List (only show if not yet selected) */}
            {!selectedProblemId && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 w-full max-w-5xl">
                    {problems.map((problem, index) => (
                        <button
                            key={problem.id}
                            onClick={() => handleProblemClick(problem.id)}
                            className="bg-white cursor-pointer text-center hover:bg-pink-100 border-4 border-pink-300 p-6 rounded-2xl shadow-xl transition text-lg font-semibold text-gray-800"
                        >
                            Problem {index + 1}
                            <br />
                            {problem.title}
                        </button>
                    ))}
                </div>
            )}

            {/* RHS: Questions (once selected) */}
            {selectedProblem && (
                <div className="w-full max-w-3xl mt-6 bg-white rounded-2xl shadow-2xl p-6 border-4 border-green-300">
                    <h2 className="text-2xl font-bold text-green-700 mb-4 text-center">
                        {selectedProblem.title}
                    </h2>

                    <ol className="ml-6 space-y-4 text-lg text-gray-800">
                        {selectedProblem.questions.slice(0, currentQIndex + 1).map((q, i) => (
                            <li key={i} className="bg-yellow-200 rounded-lg p-3 shadow-sm">{q}</li>
                        ))}
                    </ol>

                    {currentQIndex < selectedProblem.questions.length - 1 && (
                        <div className="text-center mt-6">
                            <button
                                onClick={handleNextQuestion}
                                className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-bold px-6 py-3 rounded-full text-lg transition"
                            >
                                Show Next Question
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
