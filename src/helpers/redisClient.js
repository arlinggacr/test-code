const redis = require("redis");

let redisClient;

async function redisData() {
  if (!redisClient) {
    redisClient = redis.createClient({
      host: process.env.REDIS_HOST || "localhost",
      port: process.env.REDIS_PORT || 6379,
    });

    redisClient.on("error", (err) => {
      console.error("Redis error:", err);
    });

    redisClient.on("connect", () => {
      console.log("Connected to Redis.");
    });

    redisClient.on("end", () => {
      console.log("Redis connection closed.");
    });

    await redisClient.connect();
  }
  return redisClient;
}

module.exports = redisData;
