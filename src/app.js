console.log("APP CHARGÉ DEPUIS :", import.meta.url);


import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

import relevesRoutes from "./routes/releves.routes.js";
import statsRoutes from "./routes/stats.routes.js";

const app = express();

// Pour lire le JSON dans les requêtes POST/PUT
app.use(express.json());

// Pour servir le dossier public (front HTML)
app.use(express.static("public"));

// ----------------------
// CONFIG SWAGGER
// ----------------------
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Météo",
            version: "1.0.0",
            description: "Documentation de l'API météo",
        },
    },
    apis: ["./src/routes/*.js"], // Swagger lit tes routes
};

const swaggerSpec = swaggerJSDoc(options);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ----------------------
// ROUTES API
// ----------------------
app.use("/releves", relevesRoutes);
app.use("/stats", statsRoutes);

export default app;
