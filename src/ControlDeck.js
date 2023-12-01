


function ControlDeck({ prev, next, play, pause, currentlyPlaying }) {
  return (
    <div className="center-deck">
      <div className="song-string-container nes-container is-rounded">{"RetroPiff"}</div>
      <div className="controls">
        <div className="play nes-btn" onClick={prev}>
          <div className="nes-btn-text btn-chevron">{"«"}</div>
        </div>
        <div className="play nes-btn" onClick={currentlyPlaying ? pause : play}>
          <div className="nes-btn-text play-pause-btn">
            <div className="play-arrow">{">"}</div>
            <div className="play-bars">{"||"}</div>
          </div>
        </div>
        <div className="play nes-btn" onClick={next}>
          <div className="nes-btn-text">{"»"}</div>
        </div>
      </div>
    </div>
  );
}

export default ControlDeck;
