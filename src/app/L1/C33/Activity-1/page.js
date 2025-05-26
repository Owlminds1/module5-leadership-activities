import './page.css'

import Sequence from './components/Sequence'

export default function Home() {
  return (
    <div className="mainConatiner">
      <center>
        <h1 className="headingContaienr">Who is the Leader?</h1>
      </center>
      <Sequence />
    </div>
  );
}
