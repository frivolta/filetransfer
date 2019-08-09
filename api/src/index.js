import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import multer from 'multer';
import path from 'path';
import nodemailer from 'nodemailer';
import AWS from 'aws-sdk';
import multerS3 from 'multer-s3';
import {
  smtpConfig, s3Config, s3Region, bucket,
} from './config';
import { connect } from './database';
import AppRouter from './router';

// Amazon S3 setup
AWS.config.update(s3Config);
const s3 = new AWS.S3();
AWS.config.region = s3Region;

// Setup Nodemailer
const email = nodemailer.createTransport(smtpConfig);
// File storage config

const storageDir = path.join(__dirname, '..', 'storage');

// Local storage config
/* const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, storageDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
}); */

// const upload = multer({ storage: storageConfig }); //Local Storage upload folder

const upload = multer({
  storage: multerS3({
    s3,
    bucket,
    metadata(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key(req, file, cb) {
      const filename = `${Date.now().toString()}-${file.originalname}`;
      cb(null, filename);
    },
  }),
});


// End file storage config

const PORT = 3003;
const app = express();
app.server = http.createServer(app);


app.use(morgan('dev'));


app.use(cors({
  exposedHeaders: '*',
}));

app.use(bodyParser.json({
  limit: '50mb',
}));


app.set('root', __dirname);
app.set('storageDir', storageDir);
app.upload = upload;
app.email = email;
app.s3 = s3;

// Connect to the database.

connect((err, db) => {
  if (err) {
    console.log('An error connecting to the database', err);
    throw (err);
  }

  app.set('db', db);


  // init routers.
  new AppRouter(app);


  app.server.listen(process.env.PORT || PORT, () => {
    console.log(`App is running on port ${app.server.address().port}`);
  });
});


export default app;
