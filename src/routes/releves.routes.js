import { Router } from "express";
import { relevesController } from "../controllers/releves.controller.js";

const router = Router();

// GET /releves
router.get("/", (req, res) => relevesController.findAll(req, res));

// POST /releves
router.post("/", (req, res) => relevesController.create(req, res));

// DELETE /releves/:id
router.delete("/:id", (req, res) => relevesController.delete(req, res));

export default router;
