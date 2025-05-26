'use client'

import { useState, useRef } from 'react'

const initialPrizes = [
    "A classmate made a mistake during a big presentation and now feels really embarrassed in front of everyone.",
    "A teammate didn’t understand the project instructions and is feeling confused and left behind.",
    "A new student has joined your group and doesn’t know anyone yet.",
    "A student in your class always talks over others and doesn’t let quieter classmates speak."
]

export default function Home() {
    const [isSpinning, setIsSpinning] = useState(false)
    const [rotation, setRotation] = useState(0)
    const [result, setResult] = useState(null)
    const [prizes, setPrizes] = useState(initialPrizes)  // Keeping track of available prizes
    const wheelRef = useRef(null)

    const totalSectors = prizes.length
    const degreesPerSector = 360 / totalSectors

    // Generate colors dynamically for each sector
    const colors = [
        '#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', 'purple', 'gray',
        'orange', 'cyan', 'red', '#A29BFE', '#00B894', '#E84393'
    ]

    const backgroundStyle = colors
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

        // Remove the selected prize from the array
        setTimeout(() => {
            setIsSpinning(false)
            const selectedPrize = prizes[selected]
            setResult(selectedPrize)

            // Remove the selected prize from the prizes array
            const updatedPrizes = prizes.filter((_, index) => index !== selected)
            setPrizes(updatedPrizes)
        }, 4000)
    }

    const showBtnText = () => {
        let text = ''
        if (prizes.length > 0) {
            if (prizes.length === 1) {
                text = 'Click me to play the last spin'
            } else {
                if (isSpinning) {
                    text = 'Spinning...'
                } else {
                    text = 'Spin'
                }
            }
        }
        return text
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4">
            <h1 className=""><i>Spin the Wheel!</i></h1>

            <div className="relative w-[400px] h-[400px] mb-6"> {/* Increased the size here */}
                <div
                    ref={wheelRef}
                    className="absolute inset-0 rounded-full border-[10px] border-white shadow-xl"
                    style={{
                        background: `conic-gradient(${backgroundStyle})`,
                    }}
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[150%] w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[40px] border-b-black mt-8" />
            </div>

            {prizes.length > 0 &&
                <button
                    onClick={spinWheel}
                    className={`px-12 py-3 text-white text-lg font-semibold rounded-full shadow-md transition
                         ${isSpinning
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                        }`}
                    disabled={isSpinning}>
                    {showBtnText()}
                </button>
            }

            {result && (
                <p className="mt-6 text-[27px] text-black-1000 text-2xl w-[700px]">
                    {/* Leadership Quality: {initialPrizes.length - prizes.length} {result} */}
                    <span className='font-bold  text-[#663399]'>Scenario: {result}</span>
                </p>
            )}
        </div>
    )
}
