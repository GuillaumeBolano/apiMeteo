import { ReleveRepository} from "../repositories/releves.repository.js";
import { config } from '../config.js'

export class ReleveService {
    constructor(repository) {
        this.repository = repository; // dépendance injectée, pas créée ici
    }

    /**
     * 
     * @returns l'ensemble des relevés
     */
    async getTousLesReleves() {
        const releves = await this.repository.findAll();
        // ici viendra le métier : tri, filtres, calculs...
        return releves;

    }

    /**
     * Renvoie le relevé correspondant à l'id
     * @param {number|string} id identifiant du relevé
     * @returns {Releve | undefined} le relevé ou undefined si introuvable
     */
    async getReleveParId(id) {
        const releve = await this.repository.findById(Number(id));
        return releve;
    }
}
// on câble le service avec le repository, et on exporte l'instance prête

const repo = new ReleveRepository(config.cheminCsv);
await repo.initialiser();
export const releveService = new ReleveService(repo);