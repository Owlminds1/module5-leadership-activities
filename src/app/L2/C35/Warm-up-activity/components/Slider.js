'use client'

// import './style.css'


import Image from 'next/image'
import S1 from '../assets/s1.png';

export default function Slider() {

    return (
        <div className='slidesMainContainer'>
            <Image alt="currentObj" className='w-[1000px]' src={S1} />
        </div>
    );
}
