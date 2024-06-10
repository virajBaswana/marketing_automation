import { drizzle } from "drizzle-orm/node-postgres";
import { Client, Pool, PoolClient } from "pg";

export const DbPool = new Pool({
  host: "127.0.0.1",
  port: 5432,
  user: "postgres",
  password: "postgres",
  database: "postgres",
  
});

export function CheckDBConnection() {
  return new Promise((resolve, reject) => {
    DbPool.connect((err, client, release) => {
      if (err) {
        console.error("Error connecting to the database:", err.stack);
        reject(err);
      } else if (client) {
        const timeOfStartUp = client.query(`SELECT NOW();`);
        timeOfStartUp
          .then((data) => {
            release();
            resolve(data.rows[0].now);
          })
          .catch((error) => reject(error));
      }
    });
  });
}
