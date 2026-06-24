// src/controllers/stats.controller.js
import { statsService } from "../services/stats.service.js";

export class StatsController {
    constructor(service) {
        this.service = service;
    }

    getStats = async (req, res, next) => {
        try {
            const stats = await this.service.getStatsGlobales();
            res.json(stats);
        } catch (err) {
            next(err);
        }
    };
}

export const statsController = new StatsController(statsService);
