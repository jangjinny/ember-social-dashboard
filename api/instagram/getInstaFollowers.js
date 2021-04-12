const userInstagram = require("user-instagram");

const instaFollowers = () => {
  userInstagram('jinnyjang_')
    .then(console.log)
    .catch(console.error);
};

