import { Router } from "express";
import { releveController as controller } from "../controllers/releves.controller.js";

const router = Router();

/**
 * @openapi
 * /releves:
 *   get:
 *     summary: Liste tous les relevés météo
 *     responses:
 *       200:
 *         description: Tableau des relevés
 */
router.get("/", controller.listerReleves);


/**
 * @openapi
 * /releves/{villeId}:
 *   get:
 *     summary: Affichage d'un relevé météo
 *     parameters:
 *       - in: path
 *         name: villeId
 *         required: true
 *         description: ID numérique de la ville
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Détail d'un relevé
 *       404:
 *         description: Relevé introuvable
 */
router.get("/:id", controller.getUnReleve);

export default router;