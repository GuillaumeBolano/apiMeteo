/**
 * Représente un relevé météorologique
 * Compatible avec le CSV :
 * id;ville;temperatureMin;temperatureMax;date
 */
export class Releve {
    constructor(id, ville, temperatureMin, temperatureMax, date) {
        this.id = Number(id);
        this.ville = ville;
        this.temperatureMin = Number(temperatureMin);
        this.temperatureMax = Number(temperatureMax);
        this.date = date;
    }

    /**
     * Convertit l'instance en JSON
     */
    toJSON() {
        return {
            id: this.id,
            ville: this.ville,
            date: this.date,
            temperatureMin: this.temperatureMin,
            temperatureMax: this.temperatureMax
        };
    }

    /**
     * Crée une instance depuis une ligne CSV
     * Format attendu :
     * id;ville;temperatureMin;temperatureMax;date
     */
    static depuisLigneCsv(ligne) {
        const [
            id,
            ville,
            temperatureMin,
            temperatureMax,
            date
        ] = ligne.split(";");

        return new Releve(
            id,
            ville,
            temperatureMin,
            temperatureMax,
            date
        );
    }
}
