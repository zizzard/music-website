
import React, { useState } from "react";

import Song from "./Song";

function Album({ album, updateCurrentSong }) {
  const [showSongs, setShowSongs] = useState(false);

  function clickAlbum(){
    setShowSongs(!showSongs);
  }

  let title = album.album;
  let songs = album.songs.map((song, index) => {
    return(<Song key={ title + "-" + index } song={song} updateCurrentSong={updateCurrentSong} />)
  });



  return (
    <div className="song" >
      <div onClick={clickAlbum}>{title}</div>
        {
          showSongs ? <div className="songs">{songs}</div> : <></>
        }
    </div>
  );
}

export default Album;
