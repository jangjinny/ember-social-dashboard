require('dotenv').config();
const got = require('got');
const { getAllVideos } = require('./getAllVideos');
const apiKey = process.env.YOUTUBE_API_KEY;
const channelID = 'UCAdjKaEb4cki7NyKojOGgrA'; // Cate's channel ID

const getVideoStats = async () => {

  const response = await got(`https://www.googleapis.com/youtube/v3/channels?id=${channelID}&part=contentDetails&key=${apiKey}`);

  const results = JSON.parse(response.body).items[0].contentDetails;
  const uploadID = results.relatedPlaylists.uploads;

  getAllVideos(apiKey, uploadID)
    .then(data => {
      data.map(async video => {
        const videoID = video.contentDetails.videoId;

        const videoInfo = await got(`https://youtube.googleapis.com/youtube/v3/videos?part=statistics&id=${videoID}&key=${apiKey}`)

        const videoStats = JSON.parse(videoInfo.body).items[0].statistics;

        const videoStatsObj = {
          viewCounts: videoStats.viewCount ? videoStats.viewCount : 0,
          likeCounts: videoStats.likeCount ? videoStats.likeCount : 0,
          commentCounts: videoStats.commentCount ? videoStats.commentCount : 0
        };

        console.log("This is the video Stats Obj:", videoStatsObj);

      })
    })
    .catch(err => { console.log(err) });


};

getVideoStats();
