import { relevesRepository } from "../repositories/releves.repository.js";

class RelevesService {
    async findAll() {
        return relevesRepository.findAll();
    }

    async findById(id) {
        return relevesRepository.findById(id);
    }

    async create(data) {
        return relevesRepository.create(data);
    }

    async delete(id) {
        return relevesRepository.delete(id);
    }
}

export const relevesService = new RelevesService();
