require('dotenv').config();
const got = require('got');
const apiKey = process.env.YOUTUBE_API_KEY;
const channelId = 'UCAdjKaEb4cki7NyKojOGgrA'; // Cate's channel ID

const getTotalViews = async () => {

  const response = await got(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=${apiKey}`);

  const results = JSON.parse(response.body).items[0].statistics;
  const viewCount = results.viewCount;

  console.log("This is the view count:", viewCount);
};

getTotalViews();
