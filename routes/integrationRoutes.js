import { Router } from "express";
import * as integrationController from "../controllers/integrationController.js";

const integrationRoutes = Router();

//USER-OPERATIONAL
integrationRoutes.post("/product", integrationController.addProduct);
integrationRoutes.post("/attribute", integrationController.addAttribute);

export default integrationRoutes