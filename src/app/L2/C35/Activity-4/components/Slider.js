'use client'

import { useState, useRef } from 'react'
import { jsPDF } from 'jspdf'
const initialPrizes = [
    0, 1, 2, 3, 4
]

const obj = {
    char: [
        "A nervous ninja",
        "A dancing robot",
        "A talking cat",
        "A superhero teacher",
        "A wizard who forgets spells"
    ],
    places: [
        "Inside a video game",
        "On a pirate ship",
        "In a school kitchen",
        "On the moon",
        "At a magical zoo"
    ],
    problem: [
        "Everyone starts speaking only in animal sounds.",
        "The school gets turned into a giant bouncy castle.",
        "Every door now leads to a different planet.",
        "A friendly monster shows up at recess and won’t leave.",
        "The sun is stuck in the sky, and it’s always daytime."
    ]
}

export default function Slider() {
    const lockObj = [
        {
            title: 'L – Lead (Who is the main character?)',
            description: `Start with a character your reader will care about.
Give them a name, a personality, and something they love to do.`,
        },
        {
            title: 'O – Objective (What do they want or need to do?)',
            description: `What is the character trying to do, find, fix, or learn?`,
        },
        {
            title: 'C – Confrontation (What’s in their way?)',
            description: `What problem or challenge do they face?`,
        },
        {
            title: 'K – Knockout Ending (How does it all end?)',
            description: `How does your character win, or what do they learn?`,
        },
    ]
    const [title, setTitle] = useState('')
    const [story, setStory] = useState('')

    const [isSpinning, setIsSpinning] = useState(false)
    const [rotation, setRotation] = useState(0)
    const [result, setResult] = useState(null)
    const [prizes, setPrizes] = useState(initialPrizes)  // Keeping track of available prizes
    const wheelRef = useRef(null)


    const [char, setChar] = useState("")
    const [places, setPlaces] = useState("")
    const [problem, setProblem] = useState("")

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
            debugger
            setChar(obj.char[selectedPrize])
            setPlaces(obj.places[selectedPrize])
            setProblem(obj.problem[selectedPrize])

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


    const handleDownloadPDF = () => {
        const doc = new jsPDF()
        const margin = 20
        const maxWidth = 170 // slightly less than full width to leave margin

        doc.setFontSize(18)
        doc.text(title || 'Untitled Story', margin, 30)

        doc.setFontSize(12)
        doc.setTextColor(100)

        const lines = doc.splitTextToSize(story, maxWidth)
        doc.text(lines, margin, 50)

        doc.save(`${title || 'story'}.pdf`)
    }



    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4">
            {char !== '' ? (
                <div className="flex flex-col md:flex-row gap-6">
                    {/* LHS – LOCK Framework */}
                    <div className="md:w-1/2 bg-gray-100 p-6 rounded-xl shadow-lg space-y-4">
                        {lockObj.map((item, idx) => (
                            <div key={idx}>
                                <h3 className="font-bold text-purple-700 mb-2 text-[20px]">{item.title}</h3>
                                <p className="text-gray-700 whitespace-pre-line mb-8 text-[18px]">{item.description}</p>
                            </div>
                        ))}
                    </div>

                    {/* RHS – Story Inputs */}
                    <div className="md:w-1/2 max-w-xl w-full bg-white p-6 rounded-xl shadow-lg space-y-4">
                        <p className="text-lg">
                            <span className="font-semibold text-purple-700">Character:</span> {char}
                        </p>
                        <p className="text-lg">
                            <span className="font-semibold text-purple-700">Place:</span> {places}
                        </p>
                        <p className="text-lg">
                            <span className="font-semibold text-purple-700">Problem:</span> {problem}
                        </p>

                        <input
                            type="text"
                            placeholder="Title for the story"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />

                        <textarea
                            rows="5"
                            placeholder="Write your story here..."
                            value={story}
                            onChange={(e) => setStory(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />

                        <button
                            onClick={handleDownloadPDF}
                            className="w-full cursor-pointer bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md transition"
                        >
                            Submit
                        </button>
                    </div>
                </div>

            ) : (
                <>
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
                        <p className="mt-6 text-2xl text-black-1000 text-2xl w-[500px]">
                            {/* Leadership Quality: {initialPrizes.length - prizes.length} {result} */}
                            <span className='font-semibold  text-[#663399]'>Leadership Quality: {result}</span>
                            <br />
                            <br />
                            Where have you shown this quality or seen someone showing this quality?
                        </p>
                    )}
                </>
            )}
        </div>
    )
}
