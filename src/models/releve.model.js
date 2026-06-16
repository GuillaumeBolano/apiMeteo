export class Releve {
    #id; #ville; #date; #temperatureMin; #temperatureMax; #description; #humidite;

    constructor(ville, date, temperatureMin, temperatureMax, description, humidite, id = null) {
        this.#ville = ville;
        this.#date = date;
        this.#temperatureMin = Number(temperatureMin);
        this.#temperatureMax = Number(temperatureMax);
        this.#description = description;
        this.#humidite = Number(humidite);
        this.#id = id;
    }

    get ville() {
        return this.#ville;
    }
    get date() {
        return this.#date;
    }
    get temperatureMin() {
        return this.#temperatureMin;
    }
    get temperatureMax() {
        return this.#temperatureMax;
    }
    get description() {
        return this.#description;
    }
    get humidite() {
        return this.#humidite;
    }

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

        if (this.temperatureMax > this.temperatureMin) {
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