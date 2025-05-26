'use client'

import './style.css'
import SwotCom from './SwotCom'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function Slider(props) {
    const [startSwot, setStartSwot] = useState(false)
    const [seenCounter, setSeenCounter] = useState({})

    useEffect(() => {
        setStartSwot(false)
    }, [props.currentObjIndex])

    const interMeditSassOnSwotData = (currentSwotData, currentSolutionLen, seen) => {
        const newObj = {
            [seen]: currentSolutionLen,
        }
        setSeenCounter((prevSeenCounter) => ({ ...prevSeenCounter, ...newObj }))
        if (
            seenCounter.s1 &&
            seenCounter.s1 === 4 &&
            seenCounter.s2 &&
            seenCounter.s2 === 4
        ) {
            props.passOnSwotData(currentSwotData, currentSolutionLen, 's1&&s2')
        }
    }

    const handleStartSwot = () => {
        setStartSwot(true)
    }

    return (
        <div className="flex flex-col md:flex-row gap-8 p-6 rounded-xl">
            {/* Left Column */}
            <div className="md:w-1/2 flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold text-gray-800">{props.currentObj.heading}</h1>
                <p className="text-[21px] text-gray-600 mt-2">{props.currentObj.subHeading}</p>

                <div className="flex flex-col md:flex-row gap-4 mt-4">
                    <div className="bg-blue-100 p-4 text-[18px] rounded-lg shadow-md flex-1">
                        <p className="text-gray-800">{props.currentObj.subHeading1}</p>
                    </div>
                    <div className="bg-green-100 p-4 text-[18px] rounded-lg shadow-md flex-1">
                    <p className="text-gray-800">{props.currentObj.subHeading2}</p>
                    </div>
                </div>

                <Image
                    alt="currentObj"
                    src={props.currentObj.img}
                    width={350}
                    height={350}
                    className="rounded-lg mt-4 shadow-md object-contain"
                />

                {!startSwot && (
                    <button
                        onClick={handleStartSwot}
                        className="cursor-pointer w-[100%] mt-4 bg-yellow-500 hover:bg-yellow-600 transition-colors duration-300 text-white px-6 py-3 rounded-xl text-lg font-semibold"
                    >
                        Start SWOT Analysis
                    </button>
                )}

            </div>

            {/* Right Column */}
            <div className="md:w-2/3 flex flex-col gap-6">

                {startSwot && (
                    <div className="flex flex-col gap-6 mt-4">
                        <div className="bg-white p-4 rounded-xl shadow-md">
                            <h2 className="text-xl font-semibold text-gray-700">
                                {props.currentObj.swotHeading1}
                            </h2>
                            <SwotCom
                                seen="s1"
                                questionSet="general"
                                passOnSwotData={interMeditSassOnSwotData}
                                currentObjIndex={props.currentObjIndex}
                            />
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-md">
                            <h2 className="text-xl font-semibold text-gray-700">
                                {props.currentObj.swotHeading2}
                            </h2>
                            <SwotCom
                                seen="s2"
                                questionSet="general"
                                passOnSwotData={interMeditSassOnSwotData}
                                currentObjIndex={props.currentObjIndex}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
