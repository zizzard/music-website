import React, { useState } from "react";
import Album from "./Album";


function Artist({ artist, updateCurrentSong }) {

  const [showAlbums, setShowAlbums] = useState(false);

  let title = artist.artist;
  let albums = artist.albums.map((album, index) => {
    return(<Album key={ title + "-" + index } album={album} updateCurrentSong={updateCurrentSong} />)
  });

  function clickArtist(){
    setShowAlbums(!showAlbums);
  }


  return (
    <div className="artist-title">
      <div onClick={clickArtist}>{title}</div>
        {
          showAlbums ? <div className="albums">{albums}</div> : <></>
        }
    </div>
  );
}

export default Artist;
