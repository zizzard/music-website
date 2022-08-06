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
  const [downloading, setDownloading]           = useState(false);
  const [songIndex, setSongIndex]               = useState(null);
  const [songEnded, setSongEnded]               = useState(false);


  useEffect(() => {
    if(loaded) return;

    fetch('https://zizzard-music.herokuapp.com/data').then((response) => {
      return response.json()
    }).then((data) => {
      setData(data);
      setLoaded(true);
    });
  }, [loaded]);

  useEffect(() => {
    if(!songEnded) return;

    if(audioUI !== null) audioUI.pause();
    setCurrentlyPlaying(false);

    let artist_index = songIndex[0];
    let album_index  = songIndex[1];
    let song_index   = songIndex[2] + 1;
    let songs = data[artist_index]["albums"][album_index]["songs"];

    if(songs.length === song_index){
      clearSong();
      return;
    }

    updateCurrentSong(songs[song_index]);
    setSongEnded(false);
  }, [songEnded]);

  function songEndedFunc(){
    setSongEnded(true);
  }

  function updateCurrentSong(song){
    if(audioUI != null) audioUI.pause();

    setDownloading(true);
    setCurrentSong(song);

    let artist_index = song["artist_index"];
    let album_index  = song["album_index"];
    let song_index   = song["song_index"];
    let index = [artist_index, album_index, song_index];
    setSongIndex(index);

    let url = song.song_url;
    let audio = new Audio(url)
    audio.volume = 0.02;
    audio.addEventListener("ended", songEndedFunc);

    audio.play().then(() => {
      setDownloading(false);
      setAudioUI(audio);
      setCurrentlyPlaying(true);
    });
  }

  function play(){
    if(currentSong === null) return;
    audioUI.play();
    setCurrentlyPlaying(true);
  }

  function pause(){
    audioUI.pause();
    setCurrentlyPlaying(false);
  }

  function prev(){
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

  function next(){
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
    setCurrentSong(null);
    setCurrentlyPlaying(false);
  }

  return (
    <div className="App">
        <div className="player nes-container is-rounded">
        <div className="display nes-container">
          {loaded ? 
            (<>
            
              <Navigator data={data} updateCurrentSong={updateCurrentSong} />
              <SongDisplay currentlyPlaying={currentlyPlaying} currentSong={currentSong} downloading={downloading} />

            </>) 
            : (<>
              <div className="loading-center">
                <div className="loading-text">
                  Loading
                </div>
              </div>
            </>)
          }
        </div>


          <div className="deck">
            <div className="speaker left">
              {" . . ."}<br />{". . . ."}<br />{" . . ."}<br />{". . . ."}<br />{" . . ."}
            </div>
            <div className="center-deck">
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
    </div>
  );
}

export default App;

