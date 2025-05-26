'use client'

import { useState } from 'react';

export default function Slider(props) {
    const [step, setStep] = useState(0);

    const scenario = "Students often forget to bring their homework to class.";

    const answers = [
        {
            question: "Why is this happening?",
            answer: "Because they forget to pack their homework in their bag."
        },
        {
            question: "Why do they forget to pack their homework?",
            answer: "Because they do it late at night and are tired or distracted."
        },
        {
            question: "Why do they do it late at night?",
            answer: "Because they don’t start their homework until after dinner or screen time."
        },
        {
            question: "Why don’t they start earlier?",
            answer: "Because they don’t have a set routine or reminders to do homework right after school."
        },
        {
            question: "Why don’t they have a routine?",
            answer: "Because there hasn’t been a clear plan made with them and their family about when and where to do homework."
        },
    ];

    const nextStep = () => {
        if (step < answers.length) {
            setStep(step + 1);
        }
    };

   

    return (
        <div className="max-w-3xl mx-auto p-4 bg-white rounded-2xl shadow-xl mt-2 text-center space-y-6">
            <h1 className="mb-4 text-3xl font-bold text-blue-600">5 Whys Problem Solver</h1>

            <div className="bg-yellow-100 border border-yellow-300 p-4 mb-2 rounded-xl shadow">
                <p className="text-lg font-medium text-gray-700">
                    <strong>Problem:</strong> {scenario}
                </p>
            </div>

            <div className="text-left space-y-4 mt-6">
                {answers.slice(0, step).map((item, i) => (
                    <div key={i} className="bg-gray-50 text-[18px] border border-gray-200 p-4 rounded-lg">
                        <p className="font-semibold text-gray-800">Why #{i + 1}: {item.question}</p>
                        <p className="text-gray-700 mt-2">{item.answer}</p>
                    </div>
                ))}
            </div>

            {step < answers.length ? (
                <button
                    onClick={nextStep}
                    className="cursor-pointer mt-2 bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-[10px] text-lg transition"
                >
                    Next Why
                </button>
            ) : (
                <div>
                    <p className="mt-6 font-semibold text-xl text-purple-700">
                        The root cause seems to be: <br />
                        <span className="text-black">Lack of a homework routine and planning at home.</span>
                    </p>
                    <button
                        onClick={props.handleStart}
                        className="cursor-pointer mt-4 bg-gray-500 hover:bg-gray-600 text-white py-2 px-6 rounded-[10px] text-lg transition"
                    >
                        Start
                    </button>
                </div>
            )}
        </div>
    );
}
