const express = require('express');
require('dotenv').config();
const SpotifyWebApi = require('spotify-web-api-node');
const app = express();
const PORT = 8888;

const scopes = [
  'ugc-image-upload',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'streaming',
  'app-remote-control',
  'user-read-email',
  'user-read-private',
  'playlist-read-collaborative',
  'playlist-modify-public',
  'playlist-read-private',
  'playlist-modify-private',
  'user-library-modify',
  'user-library-read',
  'user-top-read',
  'user-read-playback-position',
  'user-read-recently-played',
  'user-follow-read',
  'user-follow-modify'
];

const credentials = {
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: `http://localhost:${PORT}/callback`
};

const spotifyApi = new SpotifyWebApi(credentials);

app.get('/', (req, res) => {
  res.redirect(spotifyApi.createAuthorizeURL(scopes));
});

app.get('/callback', (req, res) => {
  const error = req.query.error;
  const code = req.query.code;

  if (error) {
    console.error('Whoops, somethings wrong:', error);
    return;
  }

  spotifyApi
    .authorizationCodeGrant(code)
    .then( data => {
      const accessToken = data.body.access_token;
      const refreshToken = data.body.refresh_token;
      const expiresIn = data.body.expires_in;

      spotifyApi.setAccessToken(accessToken);
      spotifyApi.setRefreshToken(refreshToken);

      console.log('access_token:', accessToken);
      console.log('refresh_token:', refreshToken);
      console.log('access token expires in:', expiresIn);

      res.send('Success! You can now close the window.');

      setInterval(async () => {
        const data = await spotifyApi.refreshAccessToken();
        const accessToken = data.body.access_token;

        console.log('The access token has been refreshed!');
        console.log('access_token:', accessToken);

        spotifyApi.setAccessToken(accessToken);
      }, expiresIn / 2 * 1000);
    })
    .catch( error => { console.log('Error in getting tokens:', error)});

});

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}!`)
});
