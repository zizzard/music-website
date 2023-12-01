import './App.css';
import './nes.css';

import React from "react";
import Spotify from "./Spotify";

function SpotifyArtists() {


  return (
    <Spotify artists={true} share={false} />
  );
}


export default SpotifyArtists;

