import './App.css';
import './nes.css';

import React from "react";

function Home() {

  return (
    <div className="App">
      <div className="player nes-container is-rounded">
        <div className="display nes-container">
          <div className="loading-center">
            <div className="loading-text">Failed to find the specified route</div>
          </div>
        </div>
      </div>
      <div className="player background"></div>
    </div>
  );
}


export default Home;

