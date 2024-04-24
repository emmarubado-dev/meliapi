import { Router } from "express";
import * as meliController from "../controllers/meliController.js";

const meliRoutes = Router();

//USER-OPERATIONAL
meliRoutes.post("/auth", meliController.getCodeUrl);
meliRoutes.post("/token", meliController.getToken);
meliRoutes.post("/refreshtoken", meliController.refreshToken);
meliRoutes.post("/webhook", meliController.meliHooks);
//STORE-OPERATIONAL
meliRoutes.get("/getServices",meliController.getServices);
meliRoutes.post("/addService",meliController.addService);
meliRoutes.get("/user/:userId", meliController.getUser);
meliRoutes.get("/:userId/products", meliController.getProducts);

export default meliRoutes