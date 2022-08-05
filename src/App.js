import './App.css';
import './nes.css';

import React, { useState, useEffect } from "react";
import Navigator from './Navigator';
import SongDisplay from './SongDisplay';

function App() {
  const [currentSong, setCurrentSong]           = useState(null);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(false);
  const [audioUI, setAudioUI]                   = useState(null);
  const [data, setData]                         = useState(null);
  const [loaded, setLoaded]                     = useState(false);
  const [downloading, setDownloading]           = useState(false)

  useEffect(() => {
    if(loaded) return;

    fetch('https://zizzard-music.herokuapp.com/data').then((response) => {
      return response.json()
    }).then((data) => {
      setData(data);
      setLoaded(true);
    });
  }, [loaded]);


  function updateCurrentSong(song){
    if(audioUI != null) audioUI.pause();

    setDownloading(true);
    setCurrentSong(song);

    let url = song.song_url;
    let audio = new Audio(url)
    audio.volume = 0.2;
    audio.addEventListener("ended", songEnded);

    audio.play().then(() => {
      setDownloading(false);
      setAudioUI(audio);
      setCurrentlyPlaying(true);
    });
  }

  function play(){
    console.log("play");
    if(currentSong === null) return;
    audioUI.play();
    setCurrentlyPlaying(true);
  }

  function pause(){
    console.log("pause");
    audioUI.pause();
    setCurrentlyPlaying(false);
  }

  function prev(){
    console.log("prev");
    if(currentlyPlaying){
      audioUI.pause();
      setCurrentlyPlaying(false);
    }

    let artist_index = currentSong["artist_index"];
    let album_index  = currentSong["album_index"];
    let song_index   = currentSong["song_index"] - 1;
    let songs = data[artist_index]["albums"][album_index]["songs"];

    if(-1 === song_index){
      clearSong();
      return;
    }

    updateCurrentSong(songs[song_index]);
  }

  function songEnded(){
    console.log("songEnded");
    if(audioUI !== null) audioUI.pause();
    setCurrentlyPlaying(false);

    // let artist_index = currentSong["artist_index"];
    // let album_index  = currentSong["album_index"];
    // let song_index   = currentSong["song_index"] + 1;
    // let songs = data[artist_index]["albums"][album_index]["songs"];

    // if(songs.length === song_index){
    //   clearSong();
    //   return;
    // }

    // updateCurrentSong(songs[song_index]);
  }
  

  function next(){
    console.log("next");
    console.log("NEXT CALLED");
    if(currentlyPlaying){
      audioUI.pause();
      setCurrentlyPlaying(false);
    }

    let artist_index = currentSong["artist_index"];
    let album_index  = currentSong["album_index"];
    let song_index   = currentSong["song_index"] + 1;
    let songs = data[artist_index]["albums"][album_index]["songs"];

    if(songs.length === song_index){
      clearSong();
      return;
    }

    updateCurrentSong(songs[song_index]);
  }

  function clearSong(){
    console.log("clearSong");
    setCurrentSong(null);
    setCurrentlyPlaying(false);
  }

  return (
    <div className="App">
      {loaded && <>
        <div className="player nes-container is-rounded">
          <div className="display nes-container">
            <Navigator data={data} updateCurrentSong={updateCurrentSong} />
            <SongDisplay currentlyPlaying={currentlyPlaying} currentSong={currentSong} downloading={downloading} />
          </div>
          <div className="deck">
            <div className="speaker left">
              {" . . ."}<br />{". . . ."}<br />{" . . ."}<br />{". . . ."}<br />{" . . ."}
            </div>
            <div className="center-deck">
              {/* <div className="retro-piff">
                <div className="retro">RETRO</div>
                <div className="piff">piff</div>
              </div> */}
              <div className="controls">
                <div className="play nes-btn" onClick={prev}>
                  <div className="nes-btn-text">{"<"}</div>
                </div>
                <div className="play nes-btn wide" onClick={currentlyPlaying ? pause : play}>
                  <div className="nes-btn-text">{currentlyPlaying ? "Pause" : "Play"}</div>
                </div>
                <div className="play nes-btn" onClick={next}>
                  <div className="nes-btn-text">{">"}</div>
                </div>
              </div>
            </div>

            <div className="speaker right">
            {" . . ."}<br />{". . . ."}<br />{" . . ."}<br />{". . . ."}<br />{" . . ."}
            </div>
          </div>
        </div>
        <div className="player background"></div>
      </>
      }
    </div>
  );
}

export default App;

