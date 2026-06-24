import { relevesService } from "../services/releves.service.js";

class RelevesController {
    async findAll(req, res) {
        const data = await relevesService.findAll();
        res.json(data);
    }

    async create(req, res) {
        const data = await relevesService.create(req.body);
        res.json(data);
    }

    async delete(req, res) {
        const data = await relevesService.delete(req.params.id);
        res.json(data);
    }
}

export const relevesController = new RelevesController();
