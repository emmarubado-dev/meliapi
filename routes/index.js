import { Router } from "express";
import userRoutes from "./userRoutes.js";
import meliRoutes from './meliRoutes.js';
import integrationRoutes from './integrationRoutes.js';
const indexRoutes =  Router()

indexRoutes.use("/user", userRoutes);
indexRoutes.use("/meli", meliRoutes);
indexRoutes.use("/integration", integrationRoutes);

export default indexRoutes