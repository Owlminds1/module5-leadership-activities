'use client'

import './style.css'
import Image from 'next/image'
import S1 from '../assets/s1.png';
import S2 from '../assets/s2.png';
import S3 from '../assets/s3.png';
import { useState } from 'react';

export default function Slider() {
    const [currentObjIndex, setCurrentObjIndex] = useState(0);
    const [questionIndex, setQuestionIndex] = useState(0); // Track which question to show

    const obj = [
        {
            img: S1,
            heading: "The Forgotten Lunchboxes",
            subHeading: "Every day, several lunchboxes get left behind in the cafeteria. Kids come later and feel sad when they see their lunch missing. Coach Casey says: “How can we make sure no lunchbox gets left behind?”",
            questions: [
                "Where do you think lunchboxes get forgotten?",
                "What kind of reminder system would work?",
                "Can we use technology to find a solution?"
            ]
        },
        {
            img: S2,
            heading: "The Vanishing Soap Bottles",
            subHeading: "In the school bathrooms, the soap dispensers are always either empty or messed with! Coach Casey says: “Washing hands is super important. How can we make sure kids always have soap?”",
            questions: [
                "Why do you think the soap runs out or is messed with?",
                "How can we stop the soap from running out too fast?",
                "Any tech ideas?"
            ]
        },
        {
            img: S3,
            heading: "The Busy Crosswalk Challenge",
            subHeading: "Near Sunnyvale School, the crosswalk is often crowded and cars don’t always stop. Ms. Lopez, the crossing guard, says: “We need safer ways for kids to cross the street!”",
            questions: [
                "Why is the crosswalk unsafe sometimes?",
                "What safety ideas can we try?",
                "Can tech help here too?"
            ]
        }
    ];

    const handleNextQuestion = () => {
        if (questionIndex < obj[currentObjIndex].questions.length - 1) {
            setQuestionIndex(questionIndex + 1);
        }
    };

    const handleNextScenario = () => {
        setCurrentObjIndex(currentObjIndex + 1);
        setQuestionIndex(0); // Reset questions for new scenario
    };

    const currentScenario = obj[currentObjIndex];

    return (
        <div className='slidesMainContainer text-center p-6 max-w-3xl'>
            <h1 className="text-2xl font-bold mb-2">{currentScenario.heading}</h1>
            <p className="text-lg mb-4">{currentScenario.subHeading}</p>
            <center>
                <Image alt="currentObj" className='w-[400px] mb-4' src={currentScenario.img} />
            </center>

            {/* Questions Display */}
            <div className="mb-4">
                {currentScenario.questions.slice(0, questionIndex + 1).map((q, i) => (
                    <p key={i} className="text-md my-2 p-2 bg-gray-100 rounded shadow">
                        {q}
                    </p>
                ))}
            </div>

            {/* Show Question Button */}
            {questionIndex < currentScenario.questions.length - 1 && (
                <button
                    onClick={handleNextQuestion}
                    className="bg-blue-500 text-white px-6 py-0 !mt-[0px] rounded-full shadow hover:bg-blue-600 transition"
                >
                    Show Question
                </button>
            )}

            {/* Next Scenario Button */}
            {questionIndex === currentScenario.questions.length - 1 &&
                currentObjIndex < obj.length - 1 && (
                    <button
                        onClick={handleNextScenario}
                        className="bg-green-500 text-white px-6 py-0 !mt-[0px] rounded-full shadow hover:bg-green-600 transition ml-4"
                    >
                        Next
                    </button>
                )}
        </div>
    );
}
