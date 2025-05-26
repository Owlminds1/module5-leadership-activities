'use client';

import Image from 'next/image';
import City from '../assets/city.png';
import Robot from '../assets/robot.png';
import './style.css'; 

export default function Com1(pros) {
    return (
        <div className="slidesMainContainer min-h-screen flex flex-col items-center px-6 py-8 bg-gradient-to-br from-yellow-100 to-orange-200">
            <div className="flex flex-col lg:flex-row gap-12 items-center justify-center max-w-6xl w-full">
                
                {/* City Section */}
                <div className="text-center lg:text-left">
                    <h1 className="mb-4 text-3xl font-bold text-blue-800">City of Brightville</h1>
                    <p className="mb-4 text-gray-700 max-w-md text-[19px]">
                        Welcome to the city of Brightville! Everything here looks bright and fun…
                        except, lately, some strange problems have started popping up.
                        So the mayor brought in a smart robot called LogicBot 3000 to help!
                        LogicBot can scan problems and instantly suggest a solution.
                    </p>
                    <Image
                        alt="City of Brightville"
                        src={City}
                        className="rounded-2xl shadow-lg w-[350px] mx-auto lg:mx-0"
                    />
                </div>

                {/* Robot Section */}
                <div className="text-center">
                    <h1 className="mb-4 text-3xl font-bold text-purple-800">LogicBot 3000</h1>
                    <Image
                        alt="LogicBot 3000"
                        src={Robot}
                        className="rounded-2xl shadow-lg w-[350px] mx-auto"
                    />
                </div>
            </div>

            {/* Start Button */}
            <button
                onClick={pros.handleStart}
                className="mt-12 bg-green-600 hover:bg-green-700 text-white text-lg font-semibold py-3 px-8 rounded-full shadow-md transition duration-300"
            >
                Start Adventure
            </button>
        </div>
    );
}
