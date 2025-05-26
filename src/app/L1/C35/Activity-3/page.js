"use client";

import React, { useState } from 'react';

import './page.css';

import Com1 from './components/Com1'
import Com2 from './components/Com2'

import Sh1 from './assets/sh1.png'
import Sh2 from './assets/sh2.png'

export default function Home() {
  const [currentSeenIndex, setCurrentSeenIndex] = useState(0)
  const handleStart = () => {
    setCurrentSeenIndex(currentSeenIndex + 1)
  }
  return (
    <div className="mainContainer bg-gradient-to-br from-pink-200 to-yellow-100 ">
      {currentSeenIndex === 0 ? (
        <>
          <div className="headingContainer" id="headingContainer">
            <h1 className="mainHeading">Superhero Showdown</h1>
          </div>
          <center>
            <Com1
              Sh1={Sh1}
              Sh2={Sh2}
              handleStart={handleStart}
            />
          </center>
        </>
      ) : (
        <Com2 />
      )}
    </div>
  );
}
