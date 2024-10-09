import express from "express";
import db from "../model/database.js";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const router = express.Router();

// Define __filename and __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Path to your JSON file
const jsonFilePath = join(__dirname, "../db.json");

// Crear una nova activitat
router.post("/activitats", (req, res) => {
  const { nom, descripcio, capacitat_maxima } = req.body;
  const query =
    "INSERT INTO activitats (nom, descripcio, capacitat_maxima) VALUES (?, ?, ?)";

  db.query(query, [nom, descripcio, capacitat_maxima], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Error creant activitat", err });
    }
    res.status(201).json({ message: "Activitat creada correctament", result });
  });
});

// Consultar totes les activitats
router.get("/activitats", (req, res) => {
  const query = "SELECT * FROM activitats";

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error obtenint activitats", err });
    }
    res.json(results);
  });
});

// Apuntar un usuari a una activitat
router.post("/activitats/:id/join", (req, res) => {
  const activitat_id = req.params.id;
  const { usuari_id } = req.body;
  const query =
    "INSERT INTO usuaris_activitats (usuari_id, activitat_id) VALUES (?, ?)";

  db.query(query, [usuari_id, activitat_id], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error apuntant usuari a activitat", err });
    }
    res.json({ message: "Usuari apuntat a l'activitat correctament", result });
  });
});

// Importar activitats des d'un arxiu JSON
router.post("/activitats/import", async (req, res) => {
  try {
    const jsonData = fs.readFileSync(jsonFilePath, "utf-8");
    const activitats = JSON.parse(jsonData);

    // Use Promise.all to handle multiple inserts
    const insertPromises = activitats.map((activity) => {
      const { nom, descripcio, capacitat_maxima } = activity;
      const query =
        "INSERT INTO activitats (nom, descripcio, capacitat_maxima) VALUES (?, ?, ?)";
      return new Promise((resolve, reject) => {
        db.query(query, [nom, descripcio, capacitat_maxima], (err) => {
          if (err) return reject(err);
          resolve();
        });
      });
    });

    // Wait for all inserts to complete
    await Promise.all(insertPromises);

    res.json({ message: "Activitats importades correctament" });
  } catch (error) {
    res.status(500).json({ error: "Error important activitats", err: error });
  }
});

// Exportar activitats en format JSON
router.get("/activitats/export", (req, res) => {
  const query = "SELECT * FROM activitats";

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error exportant activitats", err });
    }

    fs.writeFileSync(jsonFilePath, JSON.stringify(results, null, 2), "utf-8");
    res.json({ message: "Activitats exportades correctament" });
  });
});

export default router;
