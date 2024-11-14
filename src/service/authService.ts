import fs from "fs";
// import { generateAuthToken } from "../../middleware/jwt";
import { comparePassword } from "../../helpers/bcrypt";
import { CookieOptions } from "express";
import { Request, Response } from 'express';
import User from '../model/userModel'


const data: string = fs.readFileSync("./data.json", "utf-8");
const Users = JSON.parse(data)

const cookieConfig: CookieOptions = {
    httpOnly: true,          // הגנה מפני XSS - הקוקי לא נגיש דרך JavaScript בצד הלקוח
    secure: true,            // שליחת הקוקי רק בחיבור HTTPS
    sameSite: 'strict',      // הגנה מפני CSRF
    maxAge: 24 * 60 * 60 * 1000  // תוקף של יום אחד (במילישניות)
};

interface userDTO {
	username: string,
	password: string
}

const loginUser = async (user: userDTO, res: Response) => {
	try {
		const foundUser = await User.findOne({ username: user.username })

		if (!foundUser) return console.log("User not found")
		const isPasswordCorrect = await comparePassword(user.password, foundUser.password)
		if (!isPasswordCorrect) return console.log("Incorrect password or Email");
return foundUser
	
	} catch (error) {
		throw new Error("Failed to login")
	}
}

const logoutUser = (res: Response): void => {
	try {
		res.clearCookie("auth_token", {
			httpOnly: true,
			secure: true,
			sameSite: "strict",
		});
	} catch (error) {
		console.log(error);
	}
};
      export {
        loginUser,
        logoutUser
      }