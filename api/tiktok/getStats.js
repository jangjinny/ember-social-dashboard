const TikTokScraper = require('tiktok-scraper');

const username = 'catecanning';

const getStats = async () => {

  const response = await TikTokScraper.getUserProfileInfo(username);
  const followerCount = response.stats.followerCount;
  const heartCount = response.stats.heartCount;

  console.log("This is the follower coount:", followerCount);
  console.log("This is the likes count:", heartCount);
};

getStats();
