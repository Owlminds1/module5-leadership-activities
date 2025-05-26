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
            heading: "The Playground Problem",
            subHeading: "Two kids, Alex and Emma, are arguing over who got the ball first. Everyone else has stopped playing. There are two sports teachers. Let’s see how they handle the situation.",
            char1_name: "Coach 1: David",
            chart1_res: "“Stop arguing! You sit out, you keep the ball. No more fighting or no one plays. I make the rules!”",
            char2_name: "Coach 2: Mark",
            chart2_res: "“Okay, I understand both of you are upset. Let’s listen to each other. How about we take turns with the ball? We can play a game where we flip a coin to decide who goes first, and then switch after 5 minutes. This way everyone gets a turn and no one gets left out!”",
            questions: [
                "Which coach helped the most?",
                "Was the bossy coach kind to the other kids? Why or why not?",
                "What do you think would happen if the bossy coach was in charge all the time?",
                "Which leadership style would help the most kids feel happy and included?",
            ]
        },
        {
            img: S2,
            heading: "The Sibling Tumblr",
            subHeading: "John and Mike are friends. Their kids, Mia and Leo, are playing tag in the living room. Leo trips and falls! Let’s see how the two dads react.",
            char1_name: "John",
            chart1_res: "“Mia! This is why I told you not to run inside! Go sit in time-out. Leo, you’ll be fine—just stop crying.”",
            char2_name: "Mike",
            chart2_res: "“Oh no, Leo, let’s check your knee—are you okay? Mia, I know you didn’t mean to hurt him. Let’s all sit down and take a deep breath. We’ll help Leo feel better first, then think of a safer game to play.”",
            questions: [
                "Which Dad helped the most?",
                "Was the bossy Dad kind to the kids? Why or why not?",
                "What do you think would happen if the bossy Dad was in charge all the time?",
                "Which leadership style helps kids feel safe and included?",
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
