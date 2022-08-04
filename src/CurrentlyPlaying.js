function CurrentlyPlaying({currentSong}) {
  let title = currentSong.song;
  return (
      <p>{title}</p>
  );
}

export default CurrentlyPlaying;
