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
            heading: "The Pizza Party Pick",
            subHeading: "The class is choosing toppings for the pizza at the end-of-year party, but there are disagreements over which toppings to get.",
            char1_name: "Class Monitor 1: Olivia",
            chart1_res: "“I’ve had enough! We’re getting pepperoni, and that’s final. Everyone will just have to deal with it.” ",
            char2_name: "Class Monitor 2: Emma",
            chart2_res: "Let’s make sure everyone has a chance to pick a topping! We can all vote, and whatever topping gets the most votes wins. Everyone gets a say, and no one gets left out",
            questions: [
                "Who gave everyone a chance to be included?",
                "Did Olivia’s style help the group or make it worse?",
                "What would happen if Olivia was always the leader?",
                "Whose leadership style is better in this situation? And why?",
            ]
        },
        {
            img: S2,
            heading: "The Bedtime Battle",
            subHeading: "It’s bedtime, but two siblings, Ava and Ben, are arguing because Ben wants to stay up later to watch TV, while Ava wants to go to sleep early.",
            char1_name: "John (Elder Brother)",
            chart1_res: "“You both go to bed now, no more talking or TV!”",
            char2_name: "Alex (Father)",
            chart2_res: "“Ava, you sleep now. Ben you come to our room and finish your show, but bedtime rules stay. Let’s talk if you want to change it in the future.”",
            questions: [
                "Who made the situation feel fair for both kids?",
                "How did John’s leadership style make Ava and Ben feel?",
                "What would happen if John made all decisions like this?",
                "Which leader helped both siblings feel like they had some control?",
                "Whose leadership style is better in this situation? And why",               
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
