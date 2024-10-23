import pool from "./database.js";

export default function db(query, params = []) {
  return new Promise((resolve, reject) => {
    pool.query(query, params, (err, result) => {
      if (err) {
        console.error("Database query error:", err);
        return reject(err);
      }
      resolve(result);
    });
  });
}
