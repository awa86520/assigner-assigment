const redis = require('redis');
const Redis = require("ioredis");

const redisClient = redis.createClient({
  socket: {
    host: '127.0.0.1',
    port: 6379,
  }
});

redisClient.on('error', (err) => console.error('Redis Error:', err));

redisClient.connect();

module.exports = redisClient;
