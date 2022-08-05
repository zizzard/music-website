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
  const [loaded, setLoaded]                     = useState(false)

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

    setCurrentSong(song);

    let url = song.song_url;
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

  // function skip(prev){
  //   if(currentSong == null) return;

  //   if(!currentlyPlaying){
  //     audioUI.pause();
  //     setCurrentlyPlaying(false);
  //   }

  //   let artist_index = currentSong["artist_index"];
  //   let album_index  = currentSong["album_index"];
  //   let songs        = data[artist_index]["albums"][album_index]["songs"];

  //   let update_index = 1
  //   let comparison_index = songs.length;

  //   if(prev){
  //     update_index = -1
  //     comparison_index = -1;
  //   }

  //   let song_index  = currentSong["song_index"] + update_index;
    
  //   if(song_index === comparison_index){
  //     setCurrentSong(null);
  //     return;
  //   }

  //   updateCurrentSong(songs[song_index]);
  // }


  function clearSong(){
    setCurrentSong(null);
    setCurrentlyPlaying(false);
  }

  return (
    <div className="App">
      {loaded && <div className="player nes-container is-rounded">
        <div className="display">
          <Navigator data={data} updateCurrentSong={updateCurrentSong} />
          <SongDisplay currentlyPlaying={currentlyPlaying} currentSong={currentSong} />
        </div>
        <div className="deck">
          <div className="speaker">
            {" . . ."}<br />{". . . ."}<br />{" . . ."}<br />{". . . ."}<br />{" . . ."}
          </div>
          <div className="controls">
            <div className="play nes-btn" onClick={prev}>
              <div className="nes-btn-text">{"<"}</div>
            </div>
            <div className="play nes-btn wide" onClick={pause}>
              <div className="nes-btn-text">{currentlyPlaying ? "Pause" : "Play"}</div>
            </div>
            <div className="play nes-btn" onClick={next}>
              <div className="nes-btn-text">{">"}</div>
            </div>
          </div>
          <div className="speaker">
          {" . . ."}<br />{". . . ."}<br />{" . . ."}<br />{". . . ."}<br />{" . . ."}
          </div>
        </div>
      </div>
      }
    </div>
  );
}

export default App;

