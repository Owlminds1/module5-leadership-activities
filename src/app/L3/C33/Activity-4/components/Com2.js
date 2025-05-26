'use client'

import S1 from '../assets/s1.jpeg';
import Image from 'next/image'
import { useState } from 'react'

export default function PromptWithTextarea() {
    const [response, setResponse] = useState('')

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
                    style={{margin:'auto'}}
                    className="rounded-xl shadow-md w-[350px]"
                />
            </div>

            {/* RHS */}
            <div className="lg:w-1/2 bg-white p-10">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Questions</h2>
                <textarea
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    rows={10}
                    className="w-full p-4 border border-gray-300 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 text-lg"
                    placeholder="Questions..."
                />
            </div>
        </div>
    )
}
