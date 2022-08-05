

function SongDisplay({currentlyPlaying, currentSong }) {

  return (
    <div className="song-display nes-container">
      <div className="song-display-container">
        <div className="song-playing-status">
          {
            currentlyPlaying ? "Playing" : "Paused"
          }
        </div>
        <div className="song-current">
          {
            (currentSong !== null) ?  
            <div className="marquee">
              {currentSong.song} 
            </div>
            : 
            <div>No song loaded...</div>
          }
        </div>
      </div>
    </div>
  );
}

export default SongDisplay;
