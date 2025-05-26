"use client";

import { useState } from 'react';

import './page.css';

import Slider from './components/Slider'
import Com1 from './components/Com1'


export default function Home() {
  const [currentObjIndex, setCurrentObjIndex] = useState(0)

  const handleStart = () => {
    setCurrentObjIndex(currentObjIndex + 1)
  }

  return (
    <div className="mainContainer bg-gradient-to-br from-blue-100 to-purple-100">
      {currentObjIndex > 0 &&
        <div className="headingContainer" id="headingContainer">
          <h1 className="mainHeading">Story Spinner</h1>
        </div>
      }
      <center>
        {currentObjIndex === 0 ? (
          <Com1
            handleStart={handleStart}
          />
        ) : (
          <Slider />
        )
        }
      </center>

    </div>
  );
}
