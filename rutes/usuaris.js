import express from "express";
import db from "../model/database.js";

const router = express.Router();

// Registre d'un nou usuari
router.post("/usuari", (req, res) => {
  const { nom, correu, contrasenya, edat } = req.body;
  const query =
    "INSERT INTO usuaris (nom, correu, contrasenya, edat) VALUES (?, ?, ?, ?)";

  db.query(query, [nom, correu, contrasenya, edat], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Error creant usuari", err });
    }
    res.status(201).json({ message: "Usuari creat correctament", result });
  });
});

// Consultar tots els usuaris
router.get("/usuaris", (req, res) => {
  const query = "SELECT * FROM usuaris";

  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Error obtenint usuaris", err });
    }
    res.json(result); // Return the list of usuaris
  });
});

// Consultar un usuari per id
router.get("/usuaris/:id", (req, res) => {
  const usuari_id = req.params.id;
  const query = "SELECT * FROM usuaris WHERE id = ?";

  db.query(query, [usuari_id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Error obtenint usuari", err });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Usuari no trobat" });
    }
    res.json(result[0]);
  });
});

// Actualitzar dades d'un usuari
router.put("/usuaris/:id", (req, res) => {
  const usuari_id = req.params.id;
  const { nom, correu, contrasenya, edat } = req.body;
  const query =
    "UPDATE usuaris SET nom = ?, correu = ?, contrasenya = ?, edat = ? WHERE id = ?";

  db.query(
    query,
    [nom, correu, contrasenya, edat, usuari_id],
    (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Error actualitzant usuari", err });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Usuari no trobat" });
      }
      res.json({ message: "Usuari actualitzat correctament" });
    }
  );
});

// Eliminar un usuari
router.delete("/usuaris/:id", (req, res) => {
  const usuari_id = req.params.id;
  const query = "DELETE FROM usuaris WHERE id = ?";

  db.query(query, [usuari_id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Error eliminant usuari", err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Usuari no trobat" });
    }
    res.json({ message: "Usuari eliminat correctament" });
  });
});

export default router;
