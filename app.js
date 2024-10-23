import express from "express";
import activitatsRutes from "./rutes/activitats.js";
import usuarisRutes from "./rutes/usuaris.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(activitatsRutes);
app.use(usuarisRutes);

app.get("/", (req, res) => {
  res.send("Benvingut a l'API!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
