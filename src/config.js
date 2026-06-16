import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
* @typedef {Object} Config
* @property {number} port
* @property {string} host
* @property {string} env
* @property {string} publicDir
*/

/** @type {Config} */
export const config = {
    port:      parseInt(process.env.PORT || '3000', 10),
    host:      process.env.HOST || '0.0.0.0',
    env:       process.env.NODE_ENV || 'development',
    cheminCsv: join(__dirname, '..', 'donnees/meteo.csv'), // chemin absolu vers /public
};