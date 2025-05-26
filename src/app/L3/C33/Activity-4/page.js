"use client";

import './page.css';

import Slider from './components/Slider'
import Com2 from './components/Com2'
import { useState } from 'react';


export default function Home() {
  const [currentObjIndex, setCurrentObjIndex] = useState(0)
  const handleStart = () => {
    setCurrentObjIndex(currentObjIndex + 1)
  }
  return (
    <div className="mainContainer">
      {/* <div className="headingContainer" id="headingContainer">
        <h1 className="mainHeading">Dig Deeper with 5 Whys!</h1>
      </div>
      <hr />
      <br /> */}
      <center>
        {currentObjIndex === 0 ? (
          <Slider
            handleStart={handleStart}
          />
        ) : (
          <Com2 />
        )}
      </center>

    </div>
  );
}
