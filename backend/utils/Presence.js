const redisClient = require("./config/redisClient.js");

async function isUserOnline(userId){
    const exists  = await redisClient.exists(`online:${userId}`)
return exists==1;
}

module.exports = isUserOnline