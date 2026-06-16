import { parseCsv, writeCsv } from "../utils/csv.js";
import { Releve } from "../models/releve.model.js";

export class ReleveRepository {
    constructor(cheminCsv) {
        this.cheminCsv = cheminCsv; // l'état encapsulé (plus tard : un cache)
        this.releves = [];
    }

    async initialiser() {
        this.releves = await parseCsv(this.cheminCsv);
    }

    async findAll() {
        return this.releves;
    }

    async findById(id) {
        return this.releves.find(
            releve => releve.id === Number(id)
        );
    }

    async save(releve) {
        if (!releve.id) {
            const prochainId =
                this.releves.length > 0
                    ? Math.max(...this.releves.map(r => r.id)) + 1
                    : 1;

            releve.id = prochainId;

            this.releves.push(releve);
        } else {
            const index = this.releves.findIndex(
                r => r.id === releve.id
            );

            if (index !== -1) {
                this.releves[index] = releve;
            }
        }

        await writeCsv(this.cheminCsv, this.releves);
        
        return releve;
    }

    async deleteById(id) {
        const index = this.releves.findIndex(
            releve => releve.id === Number(id)
        );

        if (index === -1) {
            return false;
        }

        this.releves.splice(index, 1);

        await writeCsv(this.cheminCsv, this.releves);

        return true;
    }
}