import express, { Request, Response, NextFunction } from "express";
import { handleError } from "../../utils/handleErrors";
import { createUser } from "../service/storeService";
import { loginUser, logoutUser } from "../service/authService";

const router = express.Router();

router.post("/login", async (req: Request, res: Response): Promise<void> => {
	try {
		const user = req.body
		const userMan = await loginUser(user,res)
		res.json(userMan)
	} catch (error: any) {
		console.error(error.message);
	}
});

router.post("/logout", (req: Request, res: Response): void => {
	try {
		logoutUser(res);
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error: any) {
		console.error(error.message);
	}
});

router.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await createUser(req.body);
      res.json(result);
    } catch (error) {
      const status = (error as { status?: number }).status || 500;
      const message = (error as Error).message || "Internal Server Error";
      handleError(res, status, message);
      next(error);
    }
  }
);

export default router;
