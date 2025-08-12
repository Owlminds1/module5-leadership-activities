'use client'

import { useState } from 'react'

const words = [
  { text: 'black', color: 'text-red-500' },
  { text: 'white', color: 'text-black' },
  { text: 'yellow', color: 'text-green-600' },
  { text: 'green', color: 'text-blue-500' },
  { text: 'red', color: 'text-yellow-400' },
  { text: 'blue', color: 'text-red-500' },
  { text: 'white', color: 'text-blue-500' },
  { text: 'black', color: 'text-yellow-400' },
  { text: 'green', color: 'text-black' },
  { text: 'yellow', color: 'text-red-500' },
  { text: 'blue', color: 'text-yellow-400' },
  { text: 'red', color: 'text-green-600' },
  { text: 'blue', color: 'text-yellow-400' },
  { text: 'red', color: 'text-blue-500' },
  { text: 'green', color: 'text-black' },
  { text: 'yellow', color: 'text-green-600' },
  { text: 'white', color: 'text-red-500' },
  { text: 'black', color: 'text-yellow-400' },
]

export default function Home() {
  const [visibleCount, setVisibleCount] = useState(0)

  const handleShowNext = () => {
    if (visibleCount < words.length) {
      setVisibleCount(visibleCount + 1)
    }
  }

  return (
    <div className="flex flex-col items-center mt-[30px] min-h-screen bg-white">
      <h1 className="text-2xl font-bold mb-6">
        How fast you can say it?
      </h1>

      <div className="grid grid-cols-6 gap-4 font-bold mt-4 min-h-[150px]">
        {words.slice(0, visibleCount).map((word, index) => (
          <p key={index} className={`${word.color} text-[35px]`}>
            {word.text}
          </p>
        ))}
      </div>

      {visibleCount < words.length && (
        <button
          onClick={handleShowNext}
          className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700"
        >
          Show Next Word
        </button>
      )}
    </div>
  )
}
