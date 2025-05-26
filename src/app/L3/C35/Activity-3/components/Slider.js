'use client'

// import './style.css'


import Image from 'next/image'
import S1 from '../assets/s1.png';
import S2 from '../assets/s2.jpeg';
import { useState } from 'react';

export default function Slider() {
    const [currentObjIndex, setCurrentObjIndex] = useState(0)
    const handleNext = () => {
        setCurrentObjIndex(currentObjIndex + 1)
    }
    return (
        <div className='slidesMainContainer'>

            {currentObjIndex === 0 ? (
                <>
                    <h1 className='w-[800px] text-[21px] font-semibold'>
                        A mind map is like a picture of your ideas! Imagine you want to plan a party. You write “Party” in the middle of your paper. Then, you draw lines out from the center for different things you need to think about, like Food, Games, Guests, and Decorations.
                    </h1>
                    <Image alt="currentObj" className='w-[600px]' src={S1} />
                    <button
                        className="bg-yellow-500 cursor-pointer rounded-[10px] px-8 py-2 text-white hover:scale-110 transition transform text-2xl"
                        onClick={handleNext}
                    >Start</button>

                </>
            ) : (
                <>
                    <h1 className='text-[22px] font-semibold mb-4'>Problem: Too Much Trash Trouble</h1>
                    <p className='text-[20px] w-[800px] mb-6'>The playground and lunch areas at Sparkstone School are full of trash after breaks. It’s not just messy but bad for the environment too.
                        Coach Casey says:
                        ‘Let’s find ways to recycle better and even make some money from trash to help improve our school!’</p>
                    <Image alt="currentObj" className='w-[400px] rounded-[20px]' src={S2} />
                </>
            )
            }


        </div>
    );
}
