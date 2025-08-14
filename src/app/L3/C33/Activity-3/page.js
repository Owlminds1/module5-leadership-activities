"use client";

import './page.css';

import Slider from './components/Slider'


export default function Home() {
  return (
    <div className="mainContainer bg-gradient-to-br from-blue-100 to-purple-100">
      <div className="headingContainer" id="headingContainer">
        <h1 className="mainHeading !mt-[10px] !mb-[0px]">Circle of Understanding</h1>
      </div>
      <center>
        <Slider />
      </center>

    </div>
  );
}
