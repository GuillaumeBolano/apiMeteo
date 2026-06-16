import express from 'express';

const app = express();

// ─── Routes ────────────────────────────────────────────────────────────────
app.get('/healthcheck', (req, res) => {
  res.status(200).json({ status: "ok" });
});

// ─── Démarrage ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API Meteo → http://localhost:${PORT}`);
});