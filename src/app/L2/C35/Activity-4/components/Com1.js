'use client';

import { useState } from 'react';

const lockSteps = [
  {
    title: 'L – Lead (Who is the main character?)',
    description: `Start with a character your reader will relate to.
Give them a name, a personality, and something they love to do.`,
    example: `Example: “Jasmine is a 9-year-old who loves solving mysteries with her dog, Pickles.”`
  },
  {
    title: 'O – Objective (What do they want or need to do?)',
    description: `What is the character trying to do, find, resolve, or learn?`,
    example: `Example: “Jasmine wants to find out who’s stealing cookies from the school kitchen.”`
  },
  {
    title: 'C – Confrontation (What’s in their way?)',
    description: `What problem or challenge do they face?`,
    example: `Example: “She finds crumbs near the principal’s office, but Pickles keeps barking at the janitor’s closet!”`
  },
  {
    title: 'K – Knockout Ending (How does it all end?)',
    description: `How does your character win, or what do they learn?`,
    example: `Example: “She sets a cookie trap and catches the real thief — a raccoon sneaking through the window!”`
  },
];

export default function Com1(props) {
  const [stepIndex, setStepIndex] = useState(0);

  const handleNext = () => {
    if (stepIndex < lockSteps.length - 1) {
      setStepIndex(stepIndex + 1);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center p-2">
      <div className="bg-white shadow-2xl rounded-2xl p-4 max-w-2xl w-full space-y-6">
        <h1 className="text-3xl font-bold text-center text-purple-700">LOCK Storytelling Framework</h1>
        
        {lockSteps.slice(0, stepIndex + 1).map((step, index) => (
          <div key={index} className="p-2 bg-purple-50 rounded-xl border border-purple-200 space-y-2">
            <h2 className="text-xl font-semibold text-purple-800">{step.title}</h2>
            <p className="text-gray-800 whitespace-pre-line">{step.description}</p>
            <p className="italic text-gray-600">{step.example}</p>
          </div>
        ))}

        {stepIndex < lockSteps.length - 1 ? (
          <div className="text-center">
            <button
              onClick={handleNext}
              className="mt-6 px-6 py-2 cursor-pointer bg-purple-600 text-white rounded-full hover:bg-purple-700 transition"
            >
              Next
            </button>
          </div>
        ) : (
          <div className="text-center space-y-4 mt-6">
            <button
              onClick={props.handleStart}
              className="bg-yellow-500 cursor-pointer rounded-[10px] px-8 py-2 text-white hover:scale-110 transition transform text-2xl"
              aria-label="Star this story"
            >
              Start
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
