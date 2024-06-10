import { createClient } from "redis";
export const redisClient = createClient({
  socket: {
    port: 6379,
    host: "localhost",
  },
});

export function CheckCacheConnection() {
  return new Promise((resolve, reject) => {
    redisClient.connect();
    redisClient.on("connect", () => {
      console.log(redisClient.isOpen);
      resolve("cache connected");
    });

    redisClient.on("error", (err) => {
      reject(err);
    });
  });
}
