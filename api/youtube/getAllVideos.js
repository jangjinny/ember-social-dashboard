const got = require('got');

const getAllVideos = async (apiKey, uploadID) => {
  const allvideos = [];

  const response = await got(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=50&playlistId=${uploadID}&key=${apiKey}`)

  const results = JSON.parse(response.body);
  const totalVideos = results.pageInfo.totalResults;
  let pageToken = results.nextPageToken;

  results.items.map(video => {
    allvideos.push(video);
  })

  if (totalVideos > 50) {
    let restOfVideos = totalVideos - 50;

    while (restOfVideos > 0) {
      const nextPageResponse = await got(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=50&pageToken=${pageToken}&playlistId=${uploadID}&key=${apiKey}`);

      const nextPageResults = JSON.parse(nextPageResponse.body);

      nextPageResults.items.map(item => {
        allvideos.push(item)
      });

      pageToken = nextPageResults.nextPageToken;
      restOfVideos = restOfVideos - 50;
    }
  }

  return allvideos;
};

module.exports = { getAllVideos };
