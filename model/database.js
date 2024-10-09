import dotenv from "dotenv";
import mysql from "mysql";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config(); // Carrega les variables guardades al file .env

// Estci utilitzant ES modules, necesito el fileURLToPath
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

// Crea un pool de conexió, es més eficaç
const pool = mysql.createPool({
  host: DB_HOST || "127.0.0.1",
  user: DB_USER || "root",
  password: DB_PASS,
  database: DB_NAME || "app_activitats",
  multipleStatements: true,
});

// Aquesta función inicialitza la base de dades amb un file sql
const initDB = () => {
  const sqlFilePath = path.join(__dirname, "init_db.sql");
  const sql = fs.readFileSync(sqlFilePath, "utf-8");

  pool.query(sql, (err, result) => {
    if (err) throw err;
    console.log("Activitats database initialized successfully!");
  });
};

// Inicialitza la db
initDB();

// Exportem la pool per poder fer queries en altres parts de la app
export default pool;
