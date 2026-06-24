import { parseCsv, writeCsv } from "../utils/csv.js";
import { Releve } from "../models/releve.model.js";

export class RelevesRepository {
    constructor(cheminCsv) {
        this.cheminCsv = cheminCsv;
        this.releves = [];
    }

    async initialiser() {
        this.releves = await parseCsv(this.cheminCsv);
    }

    async findAll() {
        return this.releves;
    }

    async findById(id) {
        return this.releves.find(r => r.id === Number(id));
    }

    async create(data) {
        const nouvelId =
            this.releves.length > 0
                ? Math.max(...this.releves.map(r => r.id)) + 1
                : 1;

        const releve = new Releve(
            data.ville,
            data.date,
            Number(data.temperatureMin),
            Number(data.temperatureMax),
            data.description ?? "",
            Number(data.humidite ?? 0),
            nouvelId
        );

        this.releves.push(releve);
        await writeCsv(this.cheminCsv, this.releves);

        return releve;
    }

    async delete(id) {
        const index = this.releves.findIndex(r => r.id === Number(id));
        if (index === -1) return false;

        this.releves.splice(index, 1);
        await writeCsv(this.cheminCsv, this.releves);

        return true;
    }
}


import { config } from "../config.js";

export const relevesRepository = new RelevesRepository(config.cheminCsv);
