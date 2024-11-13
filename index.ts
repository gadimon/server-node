import express, { Express } from 'express'
import chalk from "chalk";
import router from "./router/router";
import "dotenv/config";
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'
import { connectToDatabase } from './src/service/dataBase';

const app : Express = express();

app.use(express.json());
app.use(router);

connectToDatabase();

app.listen(process.env.PORT || 7070 , () => {
  console.log(
    chalk.blueBright(`listning on: http://localhost:${process.env.PORT|| 7070}`)
  );
  
});