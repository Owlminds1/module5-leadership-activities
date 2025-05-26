"use client";

import './page.css';

import { useState } from 'react';
import P0 from './components/P0'
import P1 from './components/P1'
import P2 from './components/P2'


export default function Home() {
  const [currentPart, setCurrentPart] = useState(0)

  const handleNext = () => {
    setCurrentPart(currentPart + 1)
  }


  return (
    <div className="mainContainer">
      <center>
        {currentPart === 0 &&
          <P0
            handleNext={handleNext}
          />
        }

        {currentPart === 1 &&
          <P1
            handleNext={handleNext}
          />
        }

        {currentPart === 2 &&
          <P2 />
        }

        {/* {currentPart === 0 ? (
          <P1
            handleNext={handleNext} />
        ) : (
          <P2 />
        )} */}

        {/* {currentPart === 0 &&
          <button
            onClick={handleNext}
            className="mt-[50px] bg-green-600 text-white px-[25px] py-[6px] text-[18px] rounded-[10px] border-0 cursor-pointer hover:text-[19px]">
            Next
          </button>
        } */}
      </center>


    </div>
  );
}
