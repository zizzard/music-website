const local = true;

const authEndpoint = "https://accounts.spotify.com/authorize";

const clientId = "368d4412d71249ea8380af9bdb7b7c83";

var uri;
if (local) uri = "http://localhost:3000/spotify";
else uri = "https://music.zachizzard.com/spotify";

const scopes = ["user-top-read"];

export const spotify_url =
  authEndpoint +
  "?client_id=" +
  clientId +
  "&redirect_uri=" +
  uri +
  "&scope=" +
  scopes.join("%20") +
  "&response_type=code&show_dialog=true";
