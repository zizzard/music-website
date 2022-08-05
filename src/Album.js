
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
    <div className="album-container">
      <div className="album-header">
        <div className="album-indent">¬</div>
        <div className="album-title" onClick={clickAlbum}>{title}</div>
      </div>
      <div className="album" >
          {
            showSongs ? <div className="songs">{songs}</div> : <></>
          }
      </div>
    </div>
  );
}

export default Album;
