import { relevesRepository } from "../repositories/releves.repository.js";

export class StatsService {
    constructor(repository) {
        this.repository = repository;
    }

    async getStatsGlobales() {
        const releves = await this.repository.findAll();

        // Si aucun relevé → valeurs nulles
        if (releves.length === 0) {
            return {
                minGlobal: null,
                maxGlobal: null,
                moyenneGlobale: null,
                topVilles: []
            };
        }

        // Températures min et max globales
        const minGlobal = Math.min(...releves.map(r => r.temperatureMin));
        const maxGlobal = Math.max(...releves.map(r => r.temperatureMax));

        // Moyenne globale
        const moyenneGlobale =
            releves.reduce((acc, r) => acc + (r.temperatureMin + r.temperatureMax) / 2, 0)
            / releves.length;

        // Top villes (par température max)
        const topVilles = [...releves]
            .sort((a, b) => b.temperatureMax - a.temperatureMax)
            .slice(0, 3)
            .map(r => ({
                ville: r.ville,
                temperatureMax: r.temperatureMax
            }));

        return {
            minGlobal,
            maxGlobal,
            moyenneGlobale: Number(moyenneGlobale.toFixed(2)),
            topVilles
        };
    }
}

export const statsService = new StatsService(relevesRepository);
