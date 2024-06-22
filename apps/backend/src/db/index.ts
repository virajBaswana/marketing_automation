import { drizzle} from "drizzle-orm/node-postgres";
import { DbPool } from "../config/db.config";

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

// export const DB = drizzle(DbPool , {schema : schema})
export const DB = drizzle(DbPool , {logger : true})

