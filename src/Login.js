import './App.css';
import './nes.css';

import { spotify_url } from "./config";
import { useNavigate } from "react-router"

import React from "react";

function Login() {
  let navigate = useNavigate();

  function login(){
    document.location.href = spotify_url;
  }

  function redirect(url) {
    if(url !== "null") navigate(url);
  }

  return (
    <div className="App">
      <div className="tab-container">
        <div className="tab" onClick={() => redirect("/")}>Music</div>
        <div className="tab" onClick={() => redirect("null")}>Artists</div>
        <div className="tab" onClick={() => redirect("null")}>Songs</div>
      </div>
      <div className="player nes-container is-rounded">
        <div className="display nes-container">
          <div className="login nes-container">
            <div className="nes-btn is-rounded" onClick={login}>
              <a className="spotify-login-link">Login to Spotify</a>
            </div>
          </div>
        </div> 
      </div>
      <div className="player background"></div>
    </div>
  );
}


export default Login;