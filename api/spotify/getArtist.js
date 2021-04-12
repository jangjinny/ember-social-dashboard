const SpotifyWebApi = require('spotify-web-api-node');
const spotifyApi = new SpotifyWebApi();

// export SPOTIFY_ACCESS_TOKEN="<token>"
spotifyApi.setAccessToken(process.env.SPOTIFY_ACCESS_TOKEN);

const getArtist = () => {
  spotifyApi.getArtist('7D25zMq1tDmT0nfh6ieYph')
    .then(data => {
      const artistInfo = data.body;
      console.log('Artist info:', artistInfo);
    })
    .catch(err => { console.log('Somethings wrong:', err) })
}

getArtist();
