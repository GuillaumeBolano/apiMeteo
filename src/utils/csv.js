import { readFile, writeFile } from "fs/promises";
import { resolve } from "path";
import { fileURLToPath } from "url";

// Correction pour __dirname en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, "..");

// Lecture CSV
export async function parseCsv(cheminRelatif) {
    const chemin = resolve(__dirname, "..", cheminRelatif);
    const contenu = await readFile(chemin, "utf-8");

    const lignes = contenu.split("\n").slice(1);

    return lignes
        .filter(l => l.trim() !== "")
        .map(l => {
            const [id, ville, temperatureMin, temperatureMax, date] = l.split(";");
            return {
                id: Number(id),
                ville,
                temperatureMin: Number(temperatureMin),
                temperatureMax: Number(temperatureMax),
                date
            };
        });
}

// Écriture CSV
export async function writeCsv(cheminRelatif, releves) {
    const chemin = resolve(__dirname, "..", cheminRelatif);

    const header = "id;ville;temperatureMin;temperatureMax;date\n";

    const lignes = releves
        .map(r => `${r.id};${r.ville};${r.temperatureMin};${r.temperatureMax};${r.date}`)
        .join("\n");

    await writeFile(chemin, header + lignes, "utf-8");
}
