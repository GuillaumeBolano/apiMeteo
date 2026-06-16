import express from "express";
import relevesRoutes from "./routes/releves.routes.js";

export const app = express();

app.use("/releves", relevesRoutes);