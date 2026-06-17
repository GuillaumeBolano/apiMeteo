import { parseCsv, writeCsv } from "../utils/csv.js";
import { Releve } from "../models/releve.model.js";

/**
 * Repository responsable de la gestion des relevés météo.
 * Les données sont chargées depuis un fichier CSV et conservées en mémoire
 */
export class ReleveRepository {
    
    /**
     * Crée une instance du repository
     * @param {string} cheminCsv Chemin relatif vers le fichier CSV des relevés
     */
    constructor(cheminCsv) {
        this.cheminCsv = cheminCsv;
        /** @type {Releve[]} */
        this.releves = [];
    }

    /**
     * Charge les relevés depuis le fichier CSV
     * @returns {Promise<void>}
     */
    async initialiser() {
        this.releves = await parseCsv(this.cheminCsv);
    }

    /**
     * Retourne tous les relevés
     * @returns {Promise<Array<Releve>>} Liste des relevés
     */
    async findAll() {
        return this.releves;
    }

    /**
     * Recherche un relevé par son identifiant
     * @param {number|string} id Identifiant du relevé
     * @returns {Promise<Releve|undefined>} Le relevé trouvé ou undefined
     */
    async findById(id) {
        return this.releves.find(
            releve => releve.id === Number(id)
        );
    }

    /**
     * Crée ou met à jour un relevé
     * Si le relevé ne possède pas d'identifiant,
     * un nouvel identifiant est généré automatiquement.
     * @param {Releve} releve Relevé à enregistrer
     * @returns {Promise<Releve>} Le relevé enregistré
     */
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

    /**
     * Supprime un relevé par son identifiant
     * @param {number|string} id Identifiant du relevé à supprimer 
     * @returns {boolean} Retourne true si la suppression a réussi,
     * false si aucun relevé correspondant n'a été trouvé
     */
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