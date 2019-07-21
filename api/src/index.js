/** @format */

import http from "http";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import multer from 'multer';
import AppRouter from "./router";
import path from 'path';


const PORT = 3001;
const app = express();

//File storage config
const storageDir = path.join(__dirname, '..', 'storage');
const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, storageDir)
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})
const upload = multer({ storage: storageConfig })

//End File storage config

app.server = http.createServer(app);

app.use(morgan("dev"));

app.use(
  cors({
    exposedHeaders: "*"
  })
);

app.use(
  bodyParser.json({
    limit: "50mb"
  })
);
app.set("root", __dirname);
app.set('storageDir', storageDir);
app.set('upload', upload)
/**
 * MONGO DB CONNECTION
 */
//DB Config
const db = require("../config/keys").mongoURI;
//Connect to mongoDB
mongoose
  .connect(db)
  .then(() => {
    console.log("MongoDB Connected");
    //Setup Router
    new AppRouter(app);
  })
  .catch(err => console.log(err));

//Starting Server
app.server.listen(process.env.PORT || PORT, () => {
  console.log(`App is running on port ${app.server.address().port}`);
});

export default app;
