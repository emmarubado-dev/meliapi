import { Router } from "express";
import * as userController from "../controllers/userController.js";

const userRoutes = Router();

//CRUD
userRoutes.post("/create", userController.createUser);
userRoutes.get('/:userId', userController.getUser);
userRoutes.post("/service/add/:userId", userController.addService);

export default userRoutes