const SpotifyWebApi = require('spotify-web-api-node');
const spotifyApi = new SpotifyWebApi();

// export SPOTIFY_ACCESS_TOKEN="<token>"
spotifyApi.setAccessToken(process.env.SPOTIFY_ACCESS_TOKEN);

const getFollowers = () => {
  spotifyApi.getMe()
    .then(data => {
      const followers = data.body.followers.total;
      console.log('Number of followers:', followers)
    })
    .catch(err => { console.log('Somethings wrong:', err) })
}

getFollowers();
