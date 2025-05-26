'use client'

import { useState, useRef } from 'react'

const initialPrizes = [
    {
        main: "Birthday Boss",
        seen: "It’s your friend’s birthday party, and YOU are the Birthday Boss! That means you’re in charge of making sure everyone has fun, feels included, and stays safe. You get to decide the games, snacks, and party rules!",
        questions: [
            "What are 3 fun things you'd plan for the party to make everyone smile?",
            "What’s one party rule you’d make so everyone feels included?",
            "If someone at the party is sad or left out, what would you say to them?",
            "What can you do to make sure YOU are being a kind and fair Birthday Boss?",
            "How can you help your guests feel special too?",
        ]
    },
    {
        main: "Pet Leader",
        seen: "You’re in charge of a house full of pets, some real, some imaginary! A puppy won’t stop barking, a cat spilled her food, and a parrot looks sad. It’s your job to help your pets feel calm, safe, and happy!",
        questions: [
            "What are 3 things you would do right away to help your pets: A puppy that keeps barking. A cat that knocked over her food bowl. A guinea pig that’s hiding in its house?",
            "What rule would you make for your pets to keep your home safe and peaceful?",
            "If your parrot is feeling lonely, what would you do to cheer them up?",
            "How will you be a kind and fair Pet Leader every day?",
        ]
    },
    {
        main: "Caring Sibling",
        seen: "Your little sibling was playing outside and accidentally tripped and scraped their knee. They’re crying, and you want to help them feel better. It’s your job to take care of them until a grown-up arrives!",
        questions: [
            "What are 3 things you would do right away to help your sibling?",
            "Your sibling is crying and scared. What would you say or do to make them feel better?",
            "How are you showing leadership at this moment?"
        ]
    }
]

export default function SpinWheelGame() {
    const [isSpinning, setIsSpinning] = useState(false)
    const [rotation, setRotation] = useState(0)
    const [prizes, setPrizes] = useState(initialPrizes)
    const [selectedPrize, setSelectedPrize] = useState(null)
    const [shownQuestions, setShownQuestions] = useState([])
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1)
    const wheelRef = useRef(null)

    const totalSectors = prizes.length
    const degreesPerSector = 360 / totalSectors

    const colors = ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#A29BFE', '#E84393']

    const backgroundStyle = prizes.map((_, i) => {
        const color = colors[i % colors.length]
        const start = (i * 100) / totalSectors
        const end = ((i + 1) * 100) / totalSectors
        return `${color} ${start}% ${end}%`
    }).join(', ')

    const spinWheel = () => {
        if (isSpinning || prizes.length === 0) return

        const selected = Math.floor(Math.random() * prizes.length)
        const extraSpins = 5 * 360
        const newRotation = extraSpins + selected * degreesPerSector + degreesPerSector / 2
        const totalRotation = rotation + newRotation

        wheelRef.current.style.transition = 'transform 4s cubic-bezier(0.33, 1, 0.68, 1)'
        wheelRef.current.style.transform = `rotate(${totalRotation}deg)`

        setIsSpinning(true)
        setRotation(totalRotation)

        setTimeout(() => {
            const prize = prizes[selected]
            setSelectedPrize(prize)
            setCurrentQuestionIndex(-1)           // Start at -1, so first click gives Q0
            setShownQuestions([])                 // Clear previous questions
            const updatedPrizes = prizes.filter((_, index) => index !== selected)
            setPrizes(updatedPrizes)
            setIsSpinning(false)
        }, 4000)
    }

    const nextQuestion = () => {
        if (!selectedPrize) return

        const nextIndex = currentQuestionIndex + 1

        if (nextIndex < selectedPrize.questions.length) {
            setCurrentQuestionIndex(nextIndex)
            setShownQuestions(prev => [...prev, selectedPrize.questions[nextIndex]])
        }
    }

    return (
        <div className="min-h-screen flex bg-gradient-to-br from-blue-100 to-purple-100 p-4">
            {/* Left Side: Wheel */}
            <div className='w-1/2'>
                <h1 className="text-2xl font-semibold mb-4"><i>Spin the Wheel!</i></h1>

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
                         ${isSpinning ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'}`}
                        disabled={isSpinning}
                    >
                        {isSpinning ? 'Spinning...' : (prizes.length === 1 ? 'Last Spin' : 'Spin')}
                    </button>
                )}
            </div>

            {/* Right Side: Description + Questions */}
            <div className='w-1/2 text-left flex flex-col justify-start'>
                {selectedPrize && (
                    <>
                        <div>
                            <p className="mt-2 mb-4 text-black text-2xl font-semibold">
                                You are a: <span className='text-purple-700'>{selectedPrize.main}</span>
                            </p>
                            <p className='text-xl mb-6'>
                                {selectedPrize.seen}
                            </p>
                        </div>

                        {shownQuestions.length > 0 && (
                            <div className="bg-white p-6 rounded-lg shadow-md text-lg space-y-4">
                                {shownQuestions.map((q, index) => (
                                    <p key={index}>
                                        <span className="font-semibold">Q{index + 1}.</span> {q}
                                    </p>
                                ))}
                            </div>
                        )}

                        {currentQuestionIndex + 1 < selectedPrize.questions.length && (
                            <button
                                onClick={nextQuestion}
                                className="mt-6 self-start bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md shadow-lg transition cursor-pointer"
                            >
                                Next
                            </button>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}
