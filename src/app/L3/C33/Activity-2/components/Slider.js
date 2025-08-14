'use client';

import './style.css';
import Image from 'next/image';
import S1 from '../assets/s1.jpeg';
import S2 from '../assets/s2.jpeg';
import { useState } from 'react';

export default function Slider() {
    const [currentObjIndex, setCurrentObjIndex] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);

    const obj = [
        {
            img: S1,
            heading: "The Group Chat Dilemma",
            subHeading: "Some students start posting mean jokes about a classmate in a group chat. A few others laugh along, but one student feels uncomfortable.",
            char1_name: "Leader 1: Sophia",
            chart1_res: "“Just ignore it. It’s not our problem. No need to start drama.”",
            char2_name: "Leader 2: Sara",
            chart2_res: "“This isn’t right. I’m going to ask them to stop and tell the teacher if it keeps happening. Everyone deserves respect.”",
            questions: [
                "Who took responsibility for protecting others?",
                "How does Sophia’s leadership style affect group safety?",
                "What kind of environment would Sara create as a leader?",
                "How would you feel with someone like Sara in your group?",
                "Whose leadership style is better in this situation? And why?"
            ]
        },
        {
            img: S2,
            heading: "The Team Conflict",
            subHeading: "During practice, Ethan and Nina have a disagreement about how to design the robot. But it gets so intense that they finally stop talking to each other, which in turn affects the team’s performance.",
            char1_name: "Leader 1: Zoe",
            chart1_res: "“This isn’t my problem. If they are not able to work together, I’ll just leave them out of the next session.”",
            char2_name: "Leader 2: Layla",
            chart2_res: "“We need to talk it out. Let’s take 5 minutes to hear both sides and find a way to work together again.”",
            questions: [
                "Who tried to keep the team united?",
                "What might go wrong with Zoe’s approach?",
                "How might Layla help the team in the long run?",
                "Which leader showed emotional intelligence?",
                "Whose leadership style is better in this situation? And why?"
            ]
        }
    ];

    const handleNextQuestion = () => {
        const totalQuestions = obj[currentObjIndex].questions.length;
        if (currentQuestionIndex < totalQuestions - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        }
    };

    const handleNextScenario = () => {
        if (currentObjIndex < obj.length - 1) {
            setCurrentObjIndex(prev => prev + 1);
            setCurrentQuestionIndex(-1);
        }
    };

    return (
        <div className="flex flex-wrap md:flex-nowrap gap-8 p-6 bg-gray-50 min-h-screen">
            {/* Left Panel */}
            <div className="md:w-1/2 w-full bg-white p-4 rounded-2xl shadow-lg space-y-4">
                <h1 className="text-2xl font-bold text-gray-800">{obj[currentObjIndex].heading}</h1>
                <p className="text-gray-700">{obj[currentObjIndex].subHeading}</p>
                <Image
                    alt="scene"
                    className="rounded-xl w-[350px] max-w-md shadow-xl"
                    src={obj[currentObjIndex].img}
                />
                <div className="flex flex-col md:flex-row gap-4 mt-4">
                    <div className="bg-blue-100 p-4 rounded-lg shadow-md flex-1">
                        <p className="font-semibold text-blue-800">{obj[currentObjIndex].char1_name}</p>
                        <p className="text-gray-800 mt-2">{obj[currentObjIndex].chart1_res}</p>
                    </div>
                    <div className="bg-green-100 p-4 rounded-lg shadow-md flex-1">
                        <p className="font-semibold text-green-800">{obj[currentObjIndex].char2_name}</p>
                        <p className="text-gray-800 mt-2">{obj[currentObjIndex].chart2_res}</p>
                    </div>
                </div>
            </div>

            {/* Right Panel */}
            <div className="md:w-1/2 w-full flex flex-col space-y-6">
                {currentQuestionIndex >= 0 && (
                    <div className="text-left bg-white p-6 rounded-2xl shadow-lg space-y-4">
                        {obj[currentObjIndex].questions.slice(0, currentQuestionIndex + 1).map((q, idx) => (
                            <p key={idx} className="text-gray-800 text-lg">
                                <span className="font-semibold text-blue-700">Q{idx + 1}.</span> {q}
                            </p>
                        ))}
                    </div>
                )}

                {currentQuestionIndex < obj[currentObjIndex].questions.length - 1 ? (
                    <button
                        onClick={handleNextQuestion}
                        className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 px-6 py-3 rounded-xl shadow-lg transition-all duration-200"
                    >
                        Next Question
                    </button>
                ) : currentObjIndex < obj.length - 1 ? (
                    <button
                        onClick={handleNextScenario}
                        className="cursor-pointer bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2 px-6 py-3 rounded-xl shadow-lg transition-all duration-200"
                    >
                        Next Scenario
                    </button>
                ) : (
                    <></>
                    // <div className="bg-green-50 border border-green-300 text-green-800 p-4 rounded-xl shadow">
                    //     🎉 You’ve completed all scenarios! Great job thinking like a leader.
                    // </div>
                )}
            </div>
        </div>
    );
}
