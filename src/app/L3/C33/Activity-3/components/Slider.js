'use client'

import { useState, useRef } from 'react'

const initialPrizes = [
    {
        scenario: "A classmate made a mistake during an important presentation and now feels really embarrassed in front of everyone.",
        questions: "As a leader who shows empathy, what can you say or do to help them feel better and confident again?"
    },
    {
        scenario: "A teammate didn’t understand the project instructions, thus feeling confused and feeling left behind.",
        questions: "How can you lead with empathy and support your teammate in understanding the task better?"
    },
    {
        scenario: "A new student has joined your group and doesn’t know anyone yet.",
        questions: "As an inclusive leader, how would you make this person feel welcome and part of the group?"
    },
    {
        scenario: "A student in your class always talks over others and doesn’t let quieter classmates speak.",
        questions: "How can you show inclusion by making sure this student is heard while also giving others a chance to speak?"
    }
]

export default function Home() {
    const [isSpinning, setIsSpinning] = useState(false)
    const [rotation, setRotation] = useState(0)
    const [result, setResult] = useState(null)
    const [prizes, setPrizes] = useState(initialPrizes)
    const wheelRef = useRef(null)

    const totalSectors = prizes.length
    const degreesPerSector = 360 / totalSectors

    const colors = [
        '#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF',
        'purple', 'gray', 'orange', 'cyan', 'red',
        '#A29BFE', '#00B894', '#E84393'
    ]

    const backgroundStyle = colors
        .slice(0, totalSectors)
        .map((color, i) => {
            const start = (i * 100) / totalSectors
            const end = ((i + 1) * 100) / totalSectors
            return `${color} ${start}% ${end}%`
        })
        .join(', ')

    const spinWheel = () => {
        if (isSpinning || !wheelRef.current) return

        const selected = Math.floor(Math.random() * totalSectors)
        const extraSpins = 5 * 360
        const newRotation = extraSpins + selected * degreesPerSector + degreesPerSector / 2
        const totalRotation = rotation + newRotation

        wheelRef.current.style.transition = 'transform 4s cubic-bezier(0.33, 1, 0.68, 1)'
        wheelRef.current.style.transform = `rotate(${totalRotation}deg)`

        setIsSpinning(true)
        setResult(null)
        setRotation(totalRotation)

        setTimeout(() => {
            setIsSpinning(false)
            const selectedPrize = prizes[selected]
            setResult(selectedPrize)

            const updatedPrizes = prizes.filter((_, index) => index !== selected)
            setPrizes(updatedPrizes)
        }, 4000)
    }

    const showBtnText = () => {
        if (prizes.length === 0) return ''
        if (isSpinning) return 'Spinning...'
        if (prizes.length === 1) return 'Click me to play the last spin'
        return 'Spin'
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4">
            <h1 className="mb-4 text-lg italic font-semibold">
                Spin the Wheel to reveal the scenario and identify leadership skills
            </h1>

            <div className="relative w-[400px] h-[400px] mb-6">
                <div
                    ref={wheelRef}
                    className="absolute inset-0 rounded-full border-[10px] border-white shadow-xl"
                    style={{
                        background: `conic-gradient(${backgroundStyle})`,
                    }}
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[150%] w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[40px] border-b-black mt-8" />
            </div>

            {prizes.length > 0 && (
                <button
                    onClick={spinWheel}
                    className={`px-12 py-3 text-white text-lg font-semibold rounded-full shadow-md transition
                        ${isSpinning ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                    disabled={isSpinning}
                >
                    {showBtnText()}
                </button>
            )}

            {result && (
                <div className="mt-6 p-4 bg-white rounded-lg shadow-lg w-[1000px]">
                    <p className="text-2xl font-bold text-[#663399]">Scenario:</p>
                    <p className="mb-4 text-xl">{result.scenario}</p>
                    <p className="text-2xl font-semibold text-gray-700 mt-[5px]">Question:</p>
                    <p className='text-xl'>{result.questions}</p>
                </div>
            )}
        </div>
    )
}
