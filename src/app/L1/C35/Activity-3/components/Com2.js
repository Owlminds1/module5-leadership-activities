import React, { useState } from 'react';
import Image from 'next/image';

import S1 from '../assets/s1.jpeg'
import S2 from '../assets/s2.jpeg'
import S3 from '../assets/s3.png'

const problems = [
  {
    problem: "Alex has a little sibling who keeps mixing up his books and toys.",
    img: S1,
    zappy_idea: "Draw a big ‘NO ENTRY’ sign and tape it to the door!",
    brainy_idea: "Make labeled boxes—one for toys, one for books—and teach your sibling where each thing goes."
  },
  {
    problem: "Maya is walking to the park and it starts raining, but she forgot her umbrella!",
    img: S2,
    zappy_idea: "Hold your empty lunch bag on your head like a helmet!",
    brainy_idea: "Use a clean plastic grocery bag as a rain hat and put bags on your shoes too!"
  },
  {
    problem: "Jack’s favorite pencil just broke and he doesn’t have any new ones!",
    img: S3,
    zappy_idea: "Grab a stick and draw in the dirt like a caveman!",
    brainy_idea: "Sharpen the other side of the pencil and use it upside down"
  }
];

export default function Com2() {
  const [current, setCurrent] = useState(0);

  const data = problems[current];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-6">
      <div className="grid grid-cols-2 gap-6">
        {/* Left Side */}
        <div className="flex flex-col items-center bg-white p-6 rounded-3xl shadow-xl border-4 border-blue-200">
          <h2 className="text-3xl font-bold mb-4 text-blue-600">Problem {current + 1}</h2>
          <p className="mb-4 text-center text-2xl text-gray-800">{data.problem}</p>
          <Image src={data.img} alt="Problem" width={350} height={250} className="rounded-xl border-2 border-blue-300" />
        </div>

        {/* Right Side */}
        <div className="space-y-6">
          {/* Super Zappy */}
          <div className="bg-pink-100 p-4 rounded-3xl shadow-xl border-4 border-pink-300">
            <div className="flex items-center gap-4">
              <h3 className="text-xl font-bold text-pink-700">SuperHero 1 - Super Zappy</h3>
            </div>
            <p className="mt-2 text-md text-gray-800">{data.zappy_idea}</p>
            <table className="w-full mt-3 border border-pink-300 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-pink-200 text-pink-800">
                  <th className="border px-3 py-2">Pros</th>
                  <th className="border px-3 py-2">Cons</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(2)].map((_, i) => (
                  <tr key={i}>
                    <td className="border px-2 py-1"><textarea className="w-full p-2 rounded-md bg-pink-50"></textarea></td>
                    <td className="border px-2 py-1"><textarea className="w-full p-2 rounded-md bg-pink-50"></textarea></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Dr. Brainy */}
          <div className="bg-green-100 p-4 rounded-3xl shadow-xl border-4 border-green-300">
            <div className="flex items-center gap-4">
              <h3 className="text-xl font-bold text-green-700">SuperHero 2 - Dr. Brainy</h3>
            </div>
            <p className="mt-2 text-md text-gray-800">{data.brainy_idea}</p>
            <table className="w-full mt-3 border border-green-300 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-green-200 text-green-800">
                  <th className="border px-3 py-2">Pros</th>
                  <th className="border px-3 py-2">Cons</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(2)].map((_, i) => (
                  <tr key={i}>
                    <td className="border px-2 py-1"><textarea className="w-full p-2 rounded-md bg-green-50"></textarea></td>
                    <td className="border px-2 py-1"><textarea className="w-full p-2 rounded-md bg-green-50"></textarea></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        {current < problems.length - 1 && (
          <button
            onClick={() => setCurrent((prev) => prev + 1)}
            className="cursor-pointer px-8 py-3 bg-indigo-500 text-white text-lg font-semibold rounded-full shadow hover:bg-indigo-600 transition"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}