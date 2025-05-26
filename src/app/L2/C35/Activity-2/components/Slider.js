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
            subHeading: "At recess, the playground is jam-packed! Kids bump into each other and can’t enjoy the swings or games.Principal Penny says, ‘We need everyone to play and stay safe. What can we do?’",
        },
        {
            img: S2,
            heading: "Missing Library Books",
            subHeading: "Lots of students forget to return library books on time. Principal Penny says, ‘Books love to come home… but they love coming back even more! Can we make it easier to remember?’ Also, some books come back torn or dirty. How can we make sure they return in good condition too?",
        },
        {
            img: S3,
            heading: "Unfair Team Picking",
            subHeading: "During PE or recess, some kids always get picked last for team games and they feel left out or don’t even get a turn to play. Principal Penny says, ‘We want games to be fun and fair for everyone! Can we come up with a better way to pick teams and include everyone?’",
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
