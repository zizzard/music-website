import './App.css';
import './nes.css';

import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router"
import Speaker from './Speaker';


function Spotify( {artists, share} ) {
  const [globalSongData, setGlobalSongData] = useState(null);
  const [songData, setSongData]             = useState(null);
  const [songString, setSongString]         = useState("Short Term");
  const [loaded, setLoaded]                 = useState(false);

  const scrollRef = useRef(null);
  let { token } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    if(share){
      getShare().then(
        (response) => {
          handleResponse(response);
        },
        (error) => {
          // setFailure(true);
        }
      );
      return;
    }


    let code = window.location.search.split(/=(.+)/)[1];

    if(code !== undefined){
      login(code).then(
        (response) => {
          handleResponse(response);
          setDataStore(response);

          let path = getRoute();
          if(path === null){
            window.history.replaceState(null, 'RetroPiff', '/spotify');
          }else{
            let fullPath = '/spotify/' + path; 
            window.history.replaceState(null, 'RetroPiff', fullPath);
          }
        },
        (error) => {
          window.location = "/login";
        });
    } else if(checkDataStore()){
      getDataStore().then(
        (response) => {
          handleResponse(response);

          let path = getRoute();
          if(path === null){
            window.history.replaceState(null, 'RetroPiff', '/spotify');
          }else{
            let fullPath = '/spotify/' + path; 
            window.history.replaceState(null, 'RetroPiff', fullPath);
          }
        },
        (reject) => {
          window.location = "/";
        });
    }else{
      window.location = "/login";
    }
  }, []);

  function getShare() {
    let url = `http://localhost:8888/getShare?id=${token}`;
    console.log(url);
    return fetch(url, {
      headers: {
        Accept: "application/json",
      },
      method: "GET",
    }).then((response) => {
      return response.json();
    });
  }

  function getRoute(){
    let locations = window.location.pathname.split("/");
    if(locations.length === 3){
      let type = locations[2];
      if(type === "artists" || type === "songs") return type; 
    }

    return null;
  }

  function handleResponse(response){
    setGlobalSongData(response);
    if(artists){
      setSongData(response["data"]["short_term_artists"]);
    }else{
      setSongData(response["data"]["short_term_tracks"]);
    }
   
    setLoaded(true);
  }

  function getCurrentTime() {
    return Math.floor(new Date().getTime() / 1000);
  }

  function getDataStore() {
    return new Promise(function (resolve, reject) {
      let dataStore = JSON.parse(window.localStorage.getItem("dataStore"));
      if (dataStore === null) {
        reject("Error: No dataStore found.");
      }

      if (dataStore.expiry_time <= getCurrentTime()) {
        window.localStorage.removeItem("dataStore");
        reject("Error: Expired dataStore");
      }

      resolve(dataStore)
    });
  }

  function setDataStore(dataStore) {
    window.localStorage.setItem("dataStore", JSON.stringify(dataStore));
  }

  function checkDataStore() {
    let dataStore = JSON.parse(window.localStorage.getItem("dataStore"));
    return !(dataStore === null || 
             dataStore.expiry_time <= getCurrentTime()
    );
  }

  function setShortTerm(){
    if(artists){
      setSongData(globalSongData["data"]["short_term_artists"]);
    }else{
      setSongData(globalSongData["data"]["short_term_tracks"]);
    }
    setSongString("Short Term");
    scrollRef.current.scrollTo(0,0);
  }

  function setMediumTerm(){
    if(artists){
      setSongData(globalSongData["data"]["medium_term_artists"]);
    }else{
      setSongData(globalSongData["data"]["medium_term_tracks"]);
    }
    setSongString("Medium Term");
    scrollRef.current.scrollTo(0,0);
  }
  
  function setLongTerm(){
    if(artists){
      setSongData(globalSongData["data"]["long_term_artists"]);
    }else{
      setSongData(globalSongData["data"]["long_term_tracks"]);
    }
    setSongString("Long Term");
    scrollRef.current.scrollTo(0,0);
  }

  function login(code) {
    let url = `http://localhost:8888/login?code=${code}`;
    return fetch(url, {
      headers: {
        Accept: "application/json",
      },
      method: "GET",
    }).then((response) => {
      console.log(response);
      return response.json();
      
    });
  }

  function redirect(url) {
    navigate(url);
  }

  return (
    <div className="App">
        <div className="tab-container">
          <div className="tab" onClick={() => redirect("/")}>Music</div>
          <div className="tab" onClick={() => redirect("/spotify/artists")}>Artists</div>
          <div className="tab" onClick={() => redirect("/spotify/songs")}>Songs</div>
        </div>
        <>
          <div className="player nes-container is-rounded">
            <div className="display nes-container">
              <div className="rankings nes-container" ref={scrollRef}>
                { loaded ? (
                  <>
                  { artists ? (
                      songData.map((artist, index) => {
                        let row_type = index % 2 === 0 ? "row-even" : "row-odd";
                        let artist_name = artist.name;
                        let artist_link = artist.href;

                        return (
                          <div key={index} className={`ranking-row ${row_type}`}>
                            <div className="ranking-number">{index + 1}</div>
                            <div className="ranking-name">{artist_name}</div>
                            <div className="ranking-link">
                              <a className="ranking-song-link" href={artist_link} target="_blank" rel="noreferrer">Spotify</a>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      songData.map((song, index) => {
                        let row_type = index % 2 === 0 ? "row-even" : "row-odd";
                        let song_title = song.name + " by " + song.artists[0].name;
                        let song_link = song.external_urls.spotify;

                        return (
                          <div key={index} className={`ranking-row ${row_type}`}>
                            <div className="ranking-number">{index + 1}</div>
                            <div className="ranking-name">{song_title}</div>
                            <div className="ranking-link">
                              <a className="ranking-song-link" href={song_link} target="_blank" rel="noreferrer">Spotify</a>
                            </div>
                          </div>);
                      })
                    )
                  }
                  </>
                  ) : 
                  <div className="login">
                    <div className="loading-center">
                      <div className="loading-text">Loading...</div>
                    </div>
                  </div>
                }
              </div>
            </div>
            <div className="deck">
              <Speaker side="left" />
              <div className="spotify-deck">
                <div className="song-string-container nes-container is-rounded">{songString}</div>
                <div className="song-controls">
                  <div className="play nes-btn" onClick={setShortTerm}>
                    <div className="nes-btn-text">{"S"}</div>
                  </div>
                  <div className="play nes-btn" onClick={setMediumTerm}>
                    <div className="nes-btn-text">{"M"}</div>
                  </div>
                  <div className="play nes-btn" onClick={setLongTerm}>
                  <div className="nes-btn-text">{"L"}</div>
                  </div>
                </div>
              </div>
              <Speaker side="right" />
            </div>
          </div>
          <div className="player background"></div>
        </>
    </div>
  );
}


export default Spotify;

