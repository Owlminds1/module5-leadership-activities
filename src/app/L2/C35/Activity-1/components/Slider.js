'use client'

import './style.css'


import Image from 'next/image'
import S1 from '../assets/s1.jpeg';
import S2 from '../assets/s2.jpeg';
import S3 from '../assets/s3.jpeg';
import S4 from '../assets/s4.jpeg';
import S5 from '../assets/s5.jpeg';
import S6 from '../assets/s6.jpeg';

import { useState } from 'react';

export default function Slider() {
    const [currentObjIndex, setCurrentObjIndex] = useState(0)
    const obj = [
        {
            img: S1,
            subHeading: "What if all the desks in your school were made of wobbly jelly?",
        },
        {
            img: S2,
            subHeading: "What if your pet dog became a professional skateboarder?",
        },
        {
            img: S3,
            subHeading: "What do you think will happen if all birds forgot how to fly?",
        },
        {
            img: S4,
            subHeading: "What if pizza grew on trees instead of fruit?",
        },
        {
            img: S5,
            subHeading: "What do you think will happen if you found a flying carpet in your closet?",
        },
        {
            img: S6,
            subHeading: "What if cars could jump like frogs?",
        },
    ]


    const handleNext = () => {
        setCurrentObjIndex(currentObjIndex + 1)
    }


    return (
        <div className='slidesMainContainer'>
            {/* <h1 className="heading">{obj[currentObjIndex]["heading"]}</h1> */}
            <h1 className="subHeading">{obj[currentObjIndex]["subHeading"]}</h1>
            <Image alt="currentObj" className='currentObj' src={obj[currentObjIndex]["img"]} />
            {currentObjIndex < obj.length - 1 &&
                <button onClick={handleNext}>Next</button>
            }
        </div>
    );
}
