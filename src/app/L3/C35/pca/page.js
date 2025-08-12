"use client";

import './page.css';

import Slider from './components/Slider'


export default function Home() {
  return (
    <div className="mainContainer">
      <div className="headingContainer" id="headingContainer">
        <h1 className="mainHeading !mb-[0px]">Nature Walk Notebook</h1>
      </div>
      <center>
        <Slider />
      </center>

    </div>
  );
}
