import fs from "fs";
import User, { IUser } from "../model/userModel"
import Missiles,{ IMissiles } from "../model/missilesModel";

const data: string = fs.readFileSync("./data.json", "utf-8");

// פונקציה לקריאת כל הנתונים מהקובץ JSON
const getAllData = async(): Promise<IMissiles[]> => {
  try {
    const all = await Missiles.find()
    return all;
  } catch (error) {
    console.log("Error reading data from JSON:", error);    
    return [];
  }
};



// פונקציה ליצירת נתון חדש
export const createUser = async (userData:any): Promise<IUser> => {
  const user = new User({
      ...userData,
  });

  return await user.save();
};




// פונקציה לעדכון נתון לפי מזהה
const updateData = async (id: string, updatedData: Partial<IUser>): Promise<IUser> => {
  // try {
  //   const currentData: IUser[] = await getAllData();
  //   const index = currentData.findIndex((item) => item.id === id);
  //   if (index === -1) throw new Error("Could not find this card in the database");

  //   currentData[index] = { ...currentData[index], ...updatedData };
  //   fs.writeFileSync("./data.json", JSON.stringify(currentData, null, 2));
  //   return Promise.resolve(currentData[index]);
  // } catch (error: any) {
  //   error.status = 404;
  //   throw error;
  // }
  return new Promise(()=>{})
};

export { getAllData, updateData };
