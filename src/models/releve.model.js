/**
 * Représente un relevé météorologique
 */
export class Releve {
    #id; #ville; #date; #temperatureMin; #temperatureMax; #description; #humidite;

    /**
     * 
     * @param {string} ville Ville concernée par le relevé
     * @param {string} date Date du relevé
     * @param {number} temperatureMin Température minimale observée
     * @param {number} temperatureMax Température maximale observée
     * @param {string} description Description des conditions météorologiques
     * @param {number} humidite Taux d'humidité en pourcentage
     * @param {?number} [id = null] Identifiant du relevé
     */
    constructor(ville, date, temperatureMin, temperatureMax, description, humidite, id = null) {
        this.#ville = ville;
        this.#date = date;
        this.#temperatureMin = Number(temperatureMin);
        this.#temperatureMax = Number(temperatureMax);
        this.#description = description;
        this.#humidite = Number(humidite);
        this.#id = id;
    }

    /**
     * Ville du relevé
     * @returns {string}
     */
    get ville() {
        return this.#ville;
    }

    /**
     * Date du relevé
     * @returns {string}
     */
    get date() {
        return this.#date;
    }

    /**
     * Température minimale
     * @returns {number}
     */
    get temperatureMin() {
        return this.#temperatureMin;
    }

    /**
     * Température maximale
     * @returns {number}
     */
    get temperatureMax() {
        return this.#temperatureMax;
    }

    /**
     * Description des conditions météorologiques
     * @returns {string}
     */
    get description() {
        return this.#description;
    }

    /**
     * Taux d'humidité en pourcentage
     * @returns {number}
     */
    get humidite() {
        return this.#humidite;
    }

    /**
     * 
     * @returns Valide les données du relevé
     * @returns {string[]} Liste des erreurs de validation
     * Un tableau vide indique que le résultat est valide 
     */
    valider() {
        let erreurs = [];

        if (!this.ville) {
            erreurs.push("La ville est obligatoire !");
        }

        if (!this.date) {
            erreurs.push("La date est obligatoire !");
        }

        if (!Number.isFinite(this.temperatureMin)) {
            erreurs.push("La température minimale doit être un nombre.");
        }

        if (!Number.isFinite(this.temperatureMax)) {
            erreurs.push("La température maximale doit être un nombre.");
        }

        if (this.temperatureMax < this.temperatureMin) {
            erreurs.push("La température maximale doit étre supérieure à la température minimale.");
        }

        if (!this.description) {
            erreurs.push("La description est obligatoire !");
        } 

        if (!Number.isFinite(this.humidite)) {
            erreurs.push("L'humidité doit être un nombre.");
        }

        return erreurs;
    }

    /**
     * Convertit l'instance en objet JSON sérialisable
     * @returns {{
     *  id: number|null,
     *  ville: string,
     *  date: string,
     *  temperatureMin: number,
     *  temperatureMax: number,
     *  description: string,
     *  humidite: number
     * }} 
     */
    toJSON() {
        return {
            id: this.#id,
            ville: this.#ville,
            date: this.#date,
            temperatureMin: this.#temperatureMin,
            temperatureMax: this.#temperatureMax,
            description: this.#description,
            humidite: this.#humidite,
        };
    }

    /**
     * Crée une instance de Releve à partir d'une ligne CSV
     * @param {string} ligne Ligne CSV au format :
     * "ville;date;temperatureMin;temperatureMax;description;humidite"
     * @returns {Releve} Instance créée à partir de la ligne CSV
     */
    static depuisLigneCsv(ligne) {
        const [
            ville,
            date,
            temperatureMin,
            temperatureMax,
            description,
            humidite,
        ] = ligne.split(";");

        return new Releve(
            ville,
            date,
            temperatureMin,
            temperatureMax,
            description,
            humidite,
        );
    }
}