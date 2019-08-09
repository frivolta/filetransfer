import path from 'path';

require('dotenv').config({ path: path.resolve(`${__dirname}/.env`) });

export const smtpConfig = {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
};

export const url = 'http://locahost:3000';

export const s3Config = {
  accessKeyId: process.env.S3_KEY_ID,
  secretAccessKey: process.env.S3_SECRET,
};
export const s3Region = process.env.S3_REGION;

export const bucket = process.env.S3_BUCKET_NAME;
