function Song({ song, updateCurrentSong }) {
  function playSong(){
    updateCurrentSong(song);
  }

  return (
    <div className="song">
      <div onClick={playSong}>{song.song}</div>
    </div>
  );
}

export default Song;
