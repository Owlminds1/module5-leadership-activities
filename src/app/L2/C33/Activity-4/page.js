"use client";

import './page.css';
import { useState } from 'react';

import Slider from './components/Slider'


export default function Home() {
  const [hideHeading, setHideHeading] = useState(true)

  return (
    <div className="mainContainer">
      {hideHeading &&
        <>
          {/* <div className="headingContainer" id="headingContainer">
            <h1 className="mainHeading">
              SWOT It Out!
            </h1>
          </div>
          <hr />
          <br /> */}
        </>
      }
      <center>
        <Slider
          setHideHeading={setHideHeading}
        />
      </center>

    </div>
  );
}
