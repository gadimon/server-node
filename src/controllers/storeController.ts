import express, { Request, Response } from "express";
import {
  getAllMissiles,
  createUser,
  buyMissileService,
} from "../service/storeService";
import { handleError } from "../../utils/handleErrors";
import User from '../model/userModel'

const router = express.Router();


router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await getAllMissiles();
     res.send(data);
     
  } catch (error: any) {
     handleError(res, error.status || 403, error.message);
  }
});


router.post("/buy", async (req: Request, res: Response): Promise<void> => {
  try {
    const { missileName, quantity, username, orgname } = req.body;

    const result = await buyMissileService(username, orgname, missileName, quantity, );
    res.status(200).json({ message: "Missile buy successfully", result });
  } catch (error: any) {
    handleError(res, error.status || 500, error.message);
  }
});










export default router;
