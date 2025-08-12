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
            heading: "The Crowded Playground",
            subHeading: "At recess, the playground gets overcrowded! Kids bump into each other and constantly haggle over their turns to use swings and slides. Principal Penny says, ‘We do not want to stop students from playing, but we need to ensure that everyone stays safe.What do we do?’",
        },
        {
            img: S2,
            heading: "Missing Library Books",
            subHeading: "Lots of students forget to return library books on time. Principal Penny says, ‘Books love to come home… but they love coming back to the library even more!  Some books come back torn or with stains. How can we make sure they return the books in time and in good condition?",
        },
        {
            img: S3,
            heading: "Unfair Team Picking",
            subHeading: "During PE or recess, some kids always get picked last for team games and they feel left out or don’t even get a turn to play. Principal Penny says, ‘We want games to be fair for all! Can we please come up with a better way to pick teams so as to include everyone?’",
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
