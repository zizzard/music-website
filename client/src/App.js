import './App.css';
import './nes.css';

import React, { useState, useEffect } from "react";
import Navigator from './Navigator';

function App() {
  const [currentSong, setCurrentSong]           = useState(null);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(false);
  const [audioUI, setAudioUI]                   = useState(null);
  const [data, setData]                         = useState(null);
  const [loaded, setLoaded]                     = useState(false)

  useEffect(() => {
    if(loaded) return;

    fetch('/data').then((response) => {
      return response.json()
    }).then((data) => {
      setData(data);
      setLoaded(true);
    });
  }, []);


  function updateCurrentSong(song){
    if(audioUI != null) audioUI.pause();

    console.log(song)
    setCurrentSong(song);

    let url = song.song_url;
    console.log(url);
    let audio = new Audio(url);
    audio.play();

    setAudioUI(audio);
    setCurrentlyPlaying(true);
  }

  function pause(){
    if(currentlyPlaying){
      audioUI.pause();
      setCurrentlyPlaying(false);
    }else{
      audioUI.play();
      setCurrentlyPlaying(true);
    }

  }

  return (
    <div className="App">
      {loaded && <div className="player nes-container is-rounded">
        <Navigator data={data} updateCurrentSong={updateCurrentSong} />
        <div className="current-song">
          {
            (currentSong !== null) ? 
            <>
              <div>{currentSong.song}</div>
              {currentlyPlaying ? <div>Playing</div> : <div>Paused</div>}
            </> : <></>
          }
        </div>

        <div className="controls nes-container">
            <div className="play nes-btn">
              <div className="nes-btn-text">{"<"}</div>
            </div>
            <div className="play nes-btn" onClick={pause}>
              <div className="nes-btn-text">{"P"}</div>
            </div>
            <div className="play nes-btn">
              <div className="nes-btn-text">{">"}</div>
            </div>
        </div>
      </div>
      }
    </div>
  );
}

export default App;

