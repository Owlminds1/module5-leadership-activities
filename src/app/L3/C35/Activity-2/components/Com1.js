'use client';

import Image from 'next/image';
import S from '../assets/s.png';
import PP from '../assets/pp.png';
import './style.css';

export default function Com1(pros) {
    return (
        <div className="slidesMainContainer min-h-screen flex flex-col items-center px-6 py-8 bg-gradient-to-br from-blue-100 to-purple-200">
            <div className="flex flex-col lg:flex-row gap-12 items-center justify-center max-w-6xl w-full">

                {/* City Section */}
                <div className="text-center lg:text-left">
                    <h1 className="mb-4 text-3xl font-bold text-blue-800">Sparkstone School</h1>
                    <p className="mb-4 text-gray-700 max-w-md text-[19px]">
                        Coach Casey wants to identify brilliant problem-solvers to help resolve three problems around school. That’s where YOU come in as part of the Fix-It Patrol! You’ll brainstorm clever, realistic, or even tech-oriented solutions. Let’s go!
                    </p>
                    <Image
                        alt="School"
                        src={S}
                        className="rounded-2xl shadow-lg w-[350px] mx-auto lg:mx-0"
                    />
                </div>

                {/* Robot Section */}
                <div className="text-center">
                    <h1 className="mb-4 text-3xl font-bold text-purple-800">Coach Casey</h1>
                    <Image
                        alt="t"
                        src={PP}
                        className="rounded-2xl shadow-lg w-[350px] mx-auto"
                    />
                </div>
            </div>

            {/* Start Button */}
            <button
                onClick={pros.handleStart}
                className="mt-12 bg-green-600 hover:bg-green-700 text-white text-lg font-semibold py-3 px-8 rounded-full shadow-md transition duration-300"
            >
                Start
            </button>
        </div>
    );
}
