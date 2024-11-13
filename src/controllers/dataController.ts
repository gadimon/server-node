import express, { Request, Response } from "express";
import {
  getAllData,
  createUser,
  updateData,
} from "../service/dataService";

import { handleError } from "../../utils/handleErrors";
import User from '../model/userModel'

const router = express.Router();

// GET all data
router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await getAllData();
     res.send(data);
     
  } catch (error: any) {
     handleError(res, error.status || 403, error.message);
  }
});



// POST new data
export const registerUser = async (req: Request, res: Response) => {
  const { username, password, org, area } = req.body;

  try {
      const user = await createUser({ username, password, org, area });

      res.status(201).json(user);
      return
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'שגיאה ברישום היוזר' });
  }

};





export default router;
