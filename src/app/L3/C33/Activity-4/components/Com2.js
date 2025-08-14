'use client'

import S1 from '../assets/s1.jpeg';
import Image from 'next/image'
import { useState } from 'react'

export default function PromptWithInputs() {
    const [responses, setResponses] = useState(["", "", "", "", ""]);
    const [showHelper, setShowHelper] = useState(false);

    const handleChange = (index, value) => {
        const updated = [...responses];
        updated[index] = value;
        setResponses(updated);
    };

    const helperText = [
        "Why #1: Why is Taylor missing meetings and acting disengaged?",
        "Why #2: Why doesn’t Taylor feel like participating in the project?",
        "Why #3: Why does Taylor feel unmotivated or disconnected from the topic?",
        "Why #4: Why hasn’t Taylor shared these feelings with the team?",
        "Why #5: Why doesn’t the team have a way to check in and support each other regularly?"
    ];

    return (
        <div className="flex flex-col lg:flex-row max-w-6xl mx-auto mt-12 bg-white shadow-xl rounded-3xl overflow-hidden border border-gray-200">
            {/* LHS */}
            <div className="lg:w-1/2 bg-gradient-to-br from-blue-100 to-purple-100 p-6 flex flex-col justify-center items-start space-y-4">
                <p className="text-[22px] font-semibold">
                    Imagine you are leading a group project on climate change. Taylor, one of your team members, has been missing meetings and seems disengaged when they do show up. The rest of the team is getting frustrated. Let’s use the 5 Whys method to figure out why Taylor is behaving this way and how you can fix the situation
                </p>
                <Image
                    src={S1}
                    alt="s1"
                    style={{ margin: 'auto' }}
                    className="rounded-xl shadow-md w-[350px]"
                />
            </div>

            {/* RHS */}
            <div className="lg:w-1/2 bg-white p-10">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Questions</h2>
                <div className="space-y-4">
                    {["1st Why?", "2nd Why?", "3rd Why?", "4th Why?", "5th Why?"].map((placeholder, index) => (
                        <input
                            key={index}
                            type="text"
                            value={responses[index]}
                            onChange={(e) => handleChange(index, e.target.value)}
                            placeholder={placeholder}
                            className="w-full p-4 border border-gray-300 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 text-lg"
                        />
                    ))}

                    {/* Helper Button */}
                    <button
                        onClick={() => setShowHelper(!showHelper)}
                        className="px-4 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md"
                    >
                        Helper
                    </button>

                    {/* Show Helper Text */}
                    {showHelper && (
                        <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 text-sm space-y-2 text-left">
                            {helperText.map((text, i) => (
                                <p key={i}>{text}</p>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
