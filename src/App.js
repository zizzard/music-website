import './App.css';
import './nes.css';

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home"
import Error from "./Error"
import Spotify from "./Spotify"
import SpotifySongs from "./SpotifySongs"
import SpotifyArtists from "./SpotifyArtists"
import Login from "./Login"

function App() {
  return (
    <>
      <BrowserRouter key="root">
          <Routes>
            <Route exact path="/" element={<Home/>}>
            </Route>
            <Route path="/spotify" element={<Spotify />}>
            </Route>
            <Route exact path="/spotify/artists" element={<SpotifyArtists />}>
            </Route>
            <Route exact path="/spotify/songs" element={<SpotifySongs />}>
            </Route>
            <Route exact path="/spotify/share/:token" element={<Spotify artists={false} share={true} />}>
            </Route>
            <Route exact path="/login" element={<Login/>}>
            </Route>
            <Route exact path="*" element={<Error/>}>
            </Route>
          </Routes>
        </BrowserRouter>
      </>
  );
}

export default App;