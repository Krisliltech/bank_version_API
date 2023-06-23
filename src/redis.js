const redis = require('redis');

// redis connection
const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
});

redisClient.connect();

redisClient.on('error', err => {
  console.error(err);
});
redisClient.on('connect', ()=> {
  console.error('Connected to Redis');
});

module.exports = {
  redisClient
};