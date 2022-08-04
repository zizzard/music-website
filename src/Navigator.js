import React from 'react';

import Artist from './Aritst';

function Navigator({ updateCurrentSong, data }) {

  return (
    <div className="navigator nes-container">
        <div className="artists">
            {
                data.map((artist, index) => {
                    return(<Artist key={ artist.artist + "-" + index } artist={artist} updateCurrentSong={updateCurrentSong} />)
                })
            }
        </div>
    </div>
  );
}

export default Navigator;
