import express from "express";
import relevesRoutes from "./routes/releves.routes.js";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

export const app = express();
const spec = swaggerJSDoc({
    definition: { openapi: "3.0.0", info: { title: "MétéoAPI", version: "1.0.0" } },
    apis: ["./src/routes/*.js"], // fichiers où chercher les annotations
});

app.use("/releves", relevesRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(spec));