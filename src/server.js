import express from 'express';
import { parseCsv } from './utils/csv.js';
import { app } from './app.js';

// ─── Routes ────────────────────────────────────────────────────────────────
// app.get('/healthcheck', (req, res) => {
//   res.status(200).json({ status: "ok" });
// });

// app.get('/releves', async (req, res) => {
//     const resultat = await parseCsv('donnees/meteo.csv');
//     res.status(200).json(resultat);
// });

// ─── Démarrage ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API Meteo → http://localhost:${PORT}`);
});