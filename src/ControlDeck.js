


function ControlDeck({ prev, next, play, pause, currentlyPlaying }) {
  return (
    <div className="center-deck">
      <div className="controls">
        <div className="play nes-btn" onClick={prev}>
          <div className="nes-btn-text">{"<"}</div>
        </div>
        <div className="play nes-btn wide" onClick={currentlyPlaying ? pause : play}>
          <div className="nes-btn-text">{currentlyPlaying ? "Pause" : "Play"}</div>
        </div>
        <div className="play nes-btn" onClick={next}>
          <div className="nes-btn-text">{">"}</div>
        </div>
      </div>
    </div>
  );
}

export default ControlDeck;
