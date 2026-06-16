import { readFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export async function parseCsv(cheminRelatif) {
    const chemin = resolve(__dirname, '..', '..', cheminRelatif);
    const contenu = await readFile(chemin, 'utf-8');
    const lignes = contenu.split('\n').filter(l => l.trim());

    // La première ligne est l'en-tête — on la saute
    return lignes.slice(1).map((ligne, index) => {
        const colonnes = ligne.split(";");
        return {
            id: index + 1,
            ville: colonnes[0]?.trim() ?? '',
            date: colonnes[1]?.trim() ?? '',
            temperatureMin: Number(colonnes[2]?.trim() ?? ''),
            temperatureMax: Number(colonnes[3]?.trim() ?? ''),
            description: colonnes[4]?.trim() ?? '',
            humidite: Number(colonnes[5]?.trim() ?? ''),
        };
    });
}