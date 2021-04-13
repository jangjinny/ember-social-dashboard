import { helper } from '@ember/component/helper';
require('dotenv').config();
const got = require('got');
const apiKey = process.env.YOUTUBE_API_KEY;
// const channelId = 'UCAdjKaEb4cki7NyKojOGgrA'; // Cate's channel ID

const getSubcriberCount = async (ID) => {

  const response = await got(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${ID}&key=${apiKey}`);

  const results = JSON.parse(response.body).items[0].statistics;
  const subscriberCount = results.subscriberCount;

  console.log("This is the subscriber count:", subscriberCount);
  return subscriberCount;
};

export default helper(getSubcriberCount);
