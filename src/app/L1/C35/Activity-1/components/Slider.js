'use client'

import './style.css'


import Image from 'next/image'
import S1 from '../assets/s1.png';
import S2 from '../assets/s2.png';
import S3 from '../assets/s3.jpeg';

import { useState } from 'react';

export default function Slider() {
    const [currentObjIndex, setCurrentObjIndex] = useState(0)
    const obj = [
        {
            img: S1,
            subHeading: "It’s Lily’s best friend’s birthday, but she forgot to get a gift. What could Lily make from things at home or school as a birthday gift for her?",
        },
        {
            img: S2,
            subHeading: "Jayden forgot his water bottle at school and he’s super thirsty. What could Jayden do (without buying one)?",
        },
        {
            img: S3,
            subHeading: "Sam sat down for lunch at school and opened his lunchbox excited to eat his favorite yogurt. But then he realized he did not have a spoon. He looked around, wondering what he could do!",
        }
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
