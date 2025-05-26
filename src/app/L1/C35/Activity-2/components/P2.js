'use client';

import { useState } from 'react';

const problems = [
    {
        id: 'nonSlipShoes',
        title: "You want to make shoes that don’t slip in the rain.",
        questions: [
            "Can you think of an animal that walks well on wet or slippery surfaces?",
            "How do ducks or frogs walk without slipping?",
            "What do their feet look like that helps them stay steady?",
            "So what is your final invention? And is inspired from which natural thing?"
        ]
    },
    {
        id: 'windProofTent',
        title: "You want to design a tent that never blows away in the wind.",
        questions: [
            "Which animal or plant stays strong during storms?",
            "How do trees or animals protect themselves from strong winds?",
            "What shapes or tricks help them stay standing?",
            "So what is your final invention? And is inspired from which natural thing?"
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
                <div className="flex justify-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
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
