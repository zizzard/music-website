function Song({ song, updateCurrentSong }) {
  function playSong(){
    updateCurrentSong(song);
  }

  return (
    <div className="song-container">
      <div className="song-indent">¬</div>
      <div className="song-title" onClick={playSong}>{song.song}</div>
    </div>
  );
}

export default Song;
