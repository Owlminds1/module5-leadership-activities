'use client'

import './style.css'


import Image from 'next/image'
import S1 from '../assets/s1.png';
import S2 from '../assets/s2.png';
import S3 from '../assets/s3.png';

import { useState } from 'react';

export default function Slider() {
    const [currentObjIndex, setCurrentObjIndex] = useState(0)
    const obj = [
        {
            img: S1,
            heading: "The Forgotten Lunchboxes",
            subHeading: "Every day, several lunchboxes get left behind in the cafeteria. Kids come back later and feel sad when they see their lunch is gone or thrown away.Coach Casey says:“How can we make sure no lunchbox gets left behind?”",
        },
        {
            img: S2,
            heading: "The Vanishing Soap Bottles",
            subHeading: "In the school bathrooms, the soap dispensers are always empty or broken! Coach Casey says:“Washing hands is super important. How can we make sure kids always have soap?”",
        },
        {
            img: S3,
            heading: "The Busy Crosswalk Challenge",
            subHeading: "Near Sunnyvale School, the crosswalk is often crowded and cars don’t always stop. Ms. Lopez, the crossing guard, says: “We need safer ways for kids to cross the street!”",
        }
    ]


    const handleNext = () => {
        setCurrentObjIndex(currentObjIndex + 1)
    }


    return (
        <div className='slidesMainContainer'>
            <h1 className="heading">{obj[currentObjIndex]["heading"]}</h1>
            <h1 className="subHeading">{obj[currentObjIndex]["subHeading"]}</h1>
            <Image alt="currentObj" className='currentObj' src={obj[currentObjIndex]["img"]} />
            {currentObjIndex < obj.length - 1 &&
                <button onClick={handleNext}>Next</button>
            }
        </div>
    );
}
