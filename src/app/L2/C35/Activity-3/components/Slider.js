'use client'

import './style.css'


import Image from 'next/image'
import P1 from '../assets/p1.png';
import P2 from '../assets/p2.png';
import P3 from '../assets/p3.png';
import P4 from '../assets/p4.png';

import { useState } from 'react';

export default function Slider() {
    const [currentObjIndex, setCurrentObjIndex] = useState(0)
    const obj = [
        {
            img: P1,
            heading: "The city park is full of trash",
            logicBotSolution: "Replace all the grass with concrete so it’s easier to clean.",
        },
        {
            img: P2,
            heading: "Kids are getting bored in the library by just reading books.",
            logicBotSolution: "Turn every book into a TV screen.",
        },
        {
            img: P3,
            heading: "Everyone forgets umbrellas when it rains.",
            logicBotSolution: "Install giant fans to blow the clouds away.",
        },
        {
            img: P4,
            heading: "Many pets are getting lost in the city and everyone is very worried.",
            logicBotSolution: "Create a free pet collar with a GPS tracker and build a Lost Pet App.",
        }
    ]


    const handleNext = () => {
        setCurrentObjIndex(currentObjIndex + 1)
    }


    return (
        <div className='slidesMainContainer'>
            <h1 className="heading">
                Problem : {obj[currentObjIndex]["heading"]}
            </h1>
            <h1 className="subHeading">
                LogicBot Solution : {obj[currentObjIndex]["logicBotSolution"]}
            </h1>
            <Image alt="currentObj" className='currentObj' src={obj[currentObjIndex]["img"]} />
            {currentObjIndex < obj.length - 1 &&
                <button onClick={handleNext}>Next</button>
            }
        </div>
    );
}
