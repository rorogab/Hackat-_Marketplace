import pool from "./database.js"; // Import the pool from database.js

// Export a function that executes a query
export default function db(query, params = []) {
  return new Promise((resolve, reject) => {
    // Use the pool to query the database
    pool.query(query, params, (err, result) => {
      if (err) {
        console.error("Database query error:", err);
        return reject(err); // Reject the promise on error
      }
      resolve(result); // Resolve with the query result
    });
  });
}
