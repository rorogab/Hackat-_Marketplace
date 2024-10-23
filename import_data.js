import fs from "fs";
import db from "./model/database.js";

async function importData() {
  try {
    const jsonData = fs.readFileSync("./db.json", "utf-8");
    const activities = JSON.parse(jsonData);

    for (let activitat of activities) {
      const { nom, descripcio, capacitat_maxima } = activitat;

      const query = `INSERT INTO activitats (nom, descripcio, capacitat_maxima) VALUES (?, ?, ?)`;
      await db(query, [nom, descripcio, capacitat_maxima]);
      console.log(`Inserted activity: ${nom}`);
    }

    console.log("All activities imported successfully!");
  } catch (error) {
    console.error("Error importing data:", error);
  }
}

importData();
