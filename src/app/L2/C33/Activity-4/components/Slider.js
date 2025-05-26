'use client'

import './style.css'

import SwotCom from './SwotCom';
import Com2 from './Com2';
import S1 from '../assets/s1.jpeg';
import S2 from '../assets/s2.jpeg';
import S3 from '../assets/s3.jpeg';

import { useState } from 'react';

export default function Slider(props) {
    const [currentObjIndex, setCurrentObjIndex] = useState(0)
    const [showNextBtn, setShowNextBtn] = useState(false)
    const [swotHeading, setSwotHeading] = useState([])

    const swotHeadingObj = [
        "S : Strengths",
        "W : Weaknesses",
        "O : Opportunities",
        "T : Threats",
    ]

    const obj = [
        {
            img: S1,
            heading: "",
            swotHeading1: "",
            swotHeading2: "",
            subHeading: "",
            subHeading1: "",
            subHeading2: ""
        },
        {
            img: S2,
            heading: "The Class Trip Dilemma",
            swotHeading1: "SWOT Analysis on Zoe’s Idea (Science Museum)",
            swotHeading2: "SWOT Analysis on Max’s Idea (Amusement Park)",
            subHeading: "The school is planning an end-of-year class trip! You, Zoe, and Max are helping pick the destination, but you don’t agree!",
            subHeading1: "Zoe says: “Let’s go to the science museum! It’s full of cool experiments and space stuff.”",
            subHeading2: "Max says: “No way! Let’s go to the amusement park!”"
        },
        {
            img: S3,
            heading: "The Birthday Cake Dilemma",
            swotHeading1: "SWOT Analysis on Mia’s Idea (Chocolate Cake)",
            swotHeading2: "SWOT Analysis on Noah’s Idea (Strawberry Cake)",
            subHeading: "It's Mia's birthday, and her parents said she and her brother, Noah, can choose one cake together for the party.",
            subHeading1: "Mia says: “Let’s get chocolate cake! Everyone loves it and it's my favorite!”",
            subHeading2: "Noah says: “No way! I want a strawberry cake because I hate chocolate!”"
        }
    ]


    const handleNext = () => {
        let currentObjIndex_temp = currentObjIndex + 1
        setShowNextBtn(false)
        setCurrentObjIndex(currentObjIndex_temp)
        if (currentObjIndex_temp > 0) {
            props.setHideHeading(false)
        }
    }


    const passOnSwotData = (currentSwotData, currentSolutionLen, seen) => {
        if (currentSolutionLen === 4) {
            setShowNextBtn(true)
        }
    }

    const handleSwotHeadingUpdate = () => {
        const len = swotHeading.length;
        if (len < swotHeadingObj.length) {
            setSwotHeading([...swotHeading, swotHeadingObj[len]]);
        } else {
            setCurrentObjIndex(currentObjIndex + 1)
        }
    }

    return (
        <div className='slidesMainContainer'>
            {currentObjIndex === 0 ? (
                // <div className="flex gap-4">
                <div className="mt-12 p-6 bg-white rounded-2xl shadow-xl max-w-3xl mx-auto text-center">
                    <h1 className="text-4xl font-extrabold text-green-700 underline underline-offset-4 mb-6">
                        SWOT It Out
                    </h1>

                    <div className="space-y-4">
                        {swotHeading.map((text, index) => (
                            <div
                                key={index}
                                className="bg-green-50 border border-green-200 p-4 rounded-xl shadow-sm text-lg font-medium text-gray-800 transition-transform duration-300 hover:scale-105"
                            >
                                {text}
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={handleSwotHeadingUpdate}
                        className="cursor-pointer mt-8 font-semibold py-3 px-6 bg-green-600 hover:bg-green-700 text-white text-xl rounded-[20px] shadow-md transition-all duration-300"
                    >
                        {swotHeading.length < swotHeadingObj.length ? 'Next' : 'Start'}
                    </button>
                </div>

            ) : (
                <div>
                    <Com2
                        passOnSwotData={passOnSwotData}
                        currentObj={obj[currentObjIndex]}
                        currentObjIndex={currentObjIndex}
                    />
                </div>
            )}

            {showNextBtn && currentObjIndex < obj.length - 1 &&
                <button className='nextButton' onClick={handleNext}>Next</button>
            }
        </div>
    );
}
