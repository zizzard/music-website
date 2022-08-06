import './App.css';
import './nes.css';

import React, { useState, useEffect } from "react";
import Navigator from './Navigator';
import SongDisplay from './SongDisplay';
import Speaker from './Speaker';
import ControlDeck from './ControlDeck';

function App() {
  const [currentSong, setCurrentSong]           = useState(null);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(false);
  const [audioUI, setAudioUI]                   = useState(null);
  const [data, setData]                         = useState(null);
  const [loaded, setLoaded]                     = useState(false);
  const [downloading, setDownloading]           = useState(false);
  const [songIndex, setSongIndex]               = useState(null);
  const [songEnded, setSongEnded]               = useState(false);

  // const [volume, setVolume]                     = useState(20);

  // function changeVolume(event){
  //   setVolume(event);
  // }

  // function getVolume(){
  //   return volume / 100;
  // }

  // useEffect(() =>{
  //   console.log(volume);
  //   // if(audioUI === null) return;
  //   // audioUI.volume = getVolume(volume);
  //   // audioUI, 
  // }, [volume])

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
    audio.volume = 0.2;
    audio.addEventListener("ended", songEndedFunc);

    audio.play().then(() => {
      setAudioUI(audio);
      setDownloading(false);
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
            <Navigator loaded={loaded} data={data} updateCurrentSong={updateCurrentSong} />
            <SongDisplay currentlyPlaying={currentlyPlaying} currentSong={currentSong} downloading={downloading} />
          </div>
          <div className="deck">
            <Speaker side="left" />
            <ControlDeck prev={prev} next={next} play={play} pause={pause} currentlyPlaying={currentlyPlaying} />
            <Speaker side="right" />
          </div>
        </div>
        <div className="player background"></div>
        {/* <div className="slider-container">
          <input type="range" min="0" max="100" value={volume} onChange={changeVolume} className="slider" orient="vertical" />
        </div> */}
    </div>

  );
}


export default App;

