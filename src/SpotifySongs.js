import './App.css';
import './nes.css';

import React from "react";
import Spotify from "./Spotify";

function SpotifySongs() {


  return (
    <Spotify artists={false} share={false} />
  );
}


export default SpotifySongs;

