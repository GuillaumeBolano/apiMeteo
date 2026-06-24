import { Router } from "express";
import { statsService } from "../services/stats.service.js";

const statsRouter = Router();

/**
 * @swagger
 * /stats:
 *   get:
 *     summary: Retourne les statistiques globales
 *     responses:
 *       200:
 *         description: Statistiques calculées
 */
statsRouter.get("/", async (req, res) => {
    try {
        const stats = await statsService.getStats();
        res.json(stats);
    } catch (error) {
        console.error("Erreur stats :", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
});

export default statsRouter;
