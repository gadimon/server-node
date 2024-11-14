import fs from "fs";
import User, { IUser } from "../model/userModel";
import Missiles, { IMissiles } from "../model/missilesModel";
import Org from '../model/orgModel';

const data: string = fs.existsSync("./data.json") ? fs.readFileSync("./data.json", "utf-8") : "";

// פונקציה לקריאת כל הנתונים מהקובץ JSON
const getAllMissiles = async (): Promise<IMissiles[]> => {
  try {
    const all = await Missiles.find();
    return all;
  } catch (error) {
    console.log("Error reading data from JSON:", error);    
    return [];
  }
};

export const buyMissileService = async (username: string, orgname: string, missileName: string, quantity: number) => {
  try {
    const user = await User.findOne({ name: username });
    const org = await Org.findOne({ name: orgname });

    if (!user) throw new Error("User not found");
    if (!org) throw new Error("Organization not found");

    const missile = await Missiles.findOne({ name: missileName });
    if (!missile) throw new Error("Missile not found");

    const total = missile.price * quantity;
    if (org.budget < total) throw new Error("Insufficient budget");

    org.budget -= total;
    org.resources.push({ missileName, quantity });

    await org.save(); 
    await user.save(); 

    return user;

  } catch (error) {
    console.error("Error in MissileService:", error);
    throw error; 
  }
};

// פונקציה ליצירת משתמש חדש
export const createUser = async (userData: any): Promise<IUser> => {
  const user = new User({
    ...userData,
  });
  return await user.save();
};

export { getAllMissiles };
