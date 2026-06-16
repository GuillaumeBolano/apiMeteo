import { releveService } from "../services/releves.service.js";

export class ReleveController {
    constructor(service) {
        this.service = service; // service injecté
    }

    // fonction fléchée en propriété : garde le bon `this` quand on la passe au router
    listerReleves = async (req, res) => {
        const releves = await this.service.getTousLesReleves();
        res.json(releves);
    };

    getUnReleve = async (req, res) => {
        const id = req.params.id;

        const releve = await this.service.getReleveParId(id);

        if (!releve) {
            return res.status(404).json({message: "Relevé introuvable"});
        }

        res.json(releve);
    };
}

export const releveController = new ReleveController(releveService);