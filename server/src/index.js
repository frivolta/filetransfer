import http from "http";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import multer from 'multer';
import path from 'path';
require('dotenv').config();

//Import Routes Dependencies
//const fileRouter = require('./routes/api/file.routes');
const fileRouter = require('./routes/api/file.routes');


//Global Variables
const PORT = 3002;
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


//Create HTTP server
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

//Setup App Middlewares
app.set("root", __dirname);
app.set('storageDir', storageDir);
app.set('upload', upload)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Setup Routes Middlewares
app.use('/api', fileRouter);

/**
 * MONGO DB CONNECTION
 */
//DB Config
const db = require('./config/keys').mongoURI;
//Connect to mongoDB
mongoose.connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

//Starting Server
app.server.listen(process.env.SERVER_PORT || PORT, () => console.log(`Server running on port ${process.env.SERVER_PORT}`));

module.exports = app;