'use client'

import './page.css'
import SlideShow from './components/SlideShow'

export default function Home() {
  return (
    <div className="mainContainer">
      <div className="headingContainer" id="headingContainer">
        <h1 className="mainHeading">Discover Leadership Style</h1>
      </div>
      <hr />
      <SlideShow />
    </div>
  );
}
