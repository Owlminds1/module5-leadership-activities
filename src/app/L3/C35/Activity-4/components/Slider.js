import { useState } from 'react';
import Image from 'next/image';

import C1 from '../assets/c1.jpeg'
import C2 from '../assets/c2.jpeg'

const problems = [
    {
        problem: 'Long Wait at the Bus Stop',
        img: 'Alex and Maya notice that many kids and elderly people have to wait 20–30 minutes at the main bus stop, but there are no seats or shade. It gets hot and uncomfortable.',
    },
    {
        problem: 'Wasted Water from Garden Hoses',
        img: 'Alex and Maya also notice neighbors forget to turn off garden hoses or sprinklers. This wastes water, and sometimes the water floods onto the road.',
    },
];

export default function CommunityLab() {
    const [showScorecard, setShowScorecard] = useState(false);
    const [showProblems, setShowProblems] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        if (currentIndex < problems.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    return (
        <div className="p-6 max-w-6xl mx-auto space-y-8">
            {!showProblems && (
                <>
                    <h1 className="text-3xl font-bold text-purple-700">Meet</h1>

                    <div className="flex justify-center flex-col sm:flex-row gap-8 items-center">
                        <div className="text-center">
                            <Image src={C1} alt="c1" className="w-[150px] h-[150px] rounded-full" />
                            <p className="mt-2 font-semibold text-lg">Alex</p>
                        </div>
                        <div className="text-center">
                            <Image src={C2} alt="c2" className="w-[150px] h-[150px] rounded-full" />
                            <p className="mt-2 font-semibold text-lg">Maya</p>
                        </div>
                    </div>

                    <p className="text-xl text-gray-700">
                        They care a lot about their community and they want to make their neighborhood a better place for everyone: kids, parents, elderly, and even pets!
                        And for that they run a <span className="font-semibold">Community Innovation Lab</span> for the betterment of the society.
                        Recently Alex and Maya have noticed some problems in their neighborhood and need your brilliant ideas to fix them.
                    </p>

                </>
            )}

            {!showScorecard && !showProblems && (
                <button
                    onClick={() => setShowScorecard(true)}
                    className="bg-purple-600 cursor-pointer hover:bg-purple-700 text-white py-2 px-4 rounded-lg font-semibold"
                >
                    Show Scorecard
                </button>
            )}

            {showScorecard && !showProblems && (
                <>
                    <table className="w-full text-left border border-gray-300 rounded-md overflow-hidden">
                        <thead className="bg-purple-100">
                            <tr>
                                <th className="p-2">Idea</th>
                                <th className="p-2">Effectiveness (1–5)</th>
                                <th className="p-2">Cost (1–5)</th>
                                <th className="p-2">Creativity (1–5)</th>
                                <th className="p-2">Total Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-2">-</td>
                                <td className="p-2">-</td>
                                <td className="p-2">-</td>
                                <td className="p-2">-</td>
                            </tr>
                        </tbody>
                    </table>
                    <button
                        onClick={() => {
                            setShowProblems(true);
                            setShowScorecard(false);
                        }}
                        className="mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-semibold"
                    >
                        Start
                    </button>
                </>
            )}

            {showProblems && (
                <div className="space-y-4">
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                        <h2 className="text-2xl font-semibold text-purple-700">Problem: {problems[currentIndex].problem}</h2>
                        <p className="text-gray-700 mt-2 text-xl">{problems[currentIndex].img}</p>
                    </div>

                    <table className="w-full text-left border border-gray-300 mt-4">
                        <thead className="bg-purple-100">
                            <tr>
                                <th className="p-2">Idea</th>
                                <th className="p-2">Effectiveness (1–5)</th>
                                <th className="p-2">Cost (1–5)</th>
                                <th className="p-2">Creativity (1–5)</th>
                                <th className="p-2">Total Score</th>
                            </tr>
                        </thead>
                        <tbody>

                            {[...Array(2)].map((_, i) => (
                                <tr key={i}>
                                    <td className="p-2">
                                        <textarea
                                            placeholder="Your idea here..."
                                            className="w-full border border-blue-500 rounded-md px-2 py-1"
                                        />
                                    </td>
                                    <td className="p-2">
                                        <input type="number" min="1" max="5" className="w-16 border border-blue-500 rounded-md px-2 py-1" />
                                    </td>
                                    <td className="p-2">
                                        <input type="number" min="1" max="5" className="w-16 border border-blue-500 rounded-md px-2 py-1" />
                                    </td>
                                    <td className="p-2">
                                        <input type="number" min="1" max="5" className="w-16 border border-blue-500 rounded-md px-2 py-1" />
                                    </td>
                                    <td className="p-2">
                                        <input type="number" min="3" max="15" className="w-20 border border-blue-500 rounded-md px-2 py-1" readOnly />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {currentIndex < problems.length - 1 && (
                        <button
                            onClick={handleNext}
                            className="mt-4 bg-blue-600 cursor-pointer hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold"
                        >
                            Next
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
