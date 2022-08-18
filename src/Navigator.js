import React from 'react';

import Artist from './Aritst';

function Navigator({ loaded, updateCurrentSong, data, dataFailure }) {

  return (
    <div className="navigator nes-container">
      {!loaded ? 
        <div className="loading-center">
          <div className="loading-text">
            {dataFailure ? "Failed to load library, please try again..." : "Downloading music library..."}
          </div>
        </div> : 
        <div className="artists">
          {
              data.map((artist, index) => {
                  return(<Artist key={ artist.artist + "-" + index } artist={artist} updateCurrentSong={updateCurrentSong} />)
              })
          }
        </div>
        }
    </div>
  );
}

export default Navigator;
