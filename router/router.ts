import express, {IRouter, NextFunction } from "express";
import dataRestController from "../src/controllers/storeController";
import authRestController from "../src/controllers/authController";
// import {verifyUser,verifyAdmin} from "../middleware/jwt"
import { handleError } from "../utils/handleErrors";

const router: IRouter = express.Router();

router.use("/data", dataRestController);
router.use("/auth", authRestController);

router.use((req, res) => {
  handleError(res, 404, "Page not found!");
});

export default router;
