import { ReleveRepository} from "../repositories/releves.repository.js";
import { config } from '../config.js'

export class ReleveService {
    constructor(repository) {
        this.repository = repository; // dépendance injectée, pas créée ici
    }

    async getTousLesReleves() {
        const releves = await this.repository.findAll();
        // ici viendra le métier : tri, filtres, calculs...
        return releves;

    }

    async getReleveParId(id) {
        const releve = await this.repository.findById(Number(id));
        return releve;
    }
}
// on câble le service avec le repository, et on exporte l'instance prête

const repo = new ReleveRepository(config.cheminCsv);
await repo.initialiser();
export const releveService = new ReleveService(repo);