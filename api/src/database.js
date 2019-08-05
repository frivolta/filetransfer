import { MongoClient } from 'mongodb';


const url = 'mongodb://root:qX0U4vWv@ds151817.mlab.com:51817/filetransfer-app';


export const connect = (callback) => {
  MongoClient.connect(url, (err, db) => callback(err, db));
};
