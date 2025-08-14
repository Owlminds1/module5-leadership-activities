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
                    <h1 className="mb-4 text-3xl font-bold text-blue-800">Brightside Elementary School</h1>
                    <p className="mb-4 text-gray-700 max-w-md text-[19px]">
                        This week at Brightside Elementary School, three tricky problems have popped up.
                        <br />
                        Principal Penny is on the lookout for someone brilliant to come up with smart, creative solutions. Are you ready to help the principal save the day?
                    </p>
                    <Image
                        alt="Brightside Elementary School"
                        src={S}
                        className="rounded-2xl shadow-lg w-[350px] mx-auto lg:mx-0"
                    />
                </div>

                {/* Robot Section */}
                <div className="text-center">
                    <h1 className="mb-4 text-3xl font-bold text-purple-800">Principal Penny</h1>
                    <Image
                        alt="Principal Penny"
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
