//Load Schema and Dependencies
import _ from 'lodash';
import path from 'path';
const File = require('../models/File');
const MongoClient = require('mongodb');

//Setup Const
const storageDir = path.join(__dirname, '..', 'storage');
const url = require("../config/keys").mongoURI;


// @route   GET api/
// @desc    Test Api Route
// @access  Public
exports.api_test = (req, res) => res.json({
    msg: 'Api endpoint works'
});

// @route   POST api/upload
// @desc    Upload file route
// @access  Public
exports.api_upload = async (req, res) => {
    const files = await req.files;
    let filesArray = [];
    //Check if files is being uploaded
    if (Object.keys(files).length > 0) {
        //Loop through object and create array from object
        _.each(files, file => {
            console.log(JSON.stringify(file))
            let fileObject = {
                name: _.get(file, 'name'),
                orginalName: _.get(file, 'originalname'),
                mimeType: _.get(file, 'mimetype'),
                filename: _.get(file, 'filename'),
                size: _.get(file, 'size'),
                create: Date.now(),
            }
            //Push the object to array
            filesArray.push(fileObject);
        })
        //Insert into db
        MongoClient.connect(url, (err, client) => {
            // Client returned
            const db = client.db('filetransfer-app');
            insertDocuments(db, filesArray, () => {
                console.log('Insert successful');
            })
        });
        res.json({
            error: {
                message: filesArray
            }
        });
    } else {
        res.json({
            error: {
                message: 'No file selected'
            }
        });
    }
}


// @route   GET api/download/:name
// @desc    Download file from route name
// @access  Public
exports.api_download = (req, res) => {
    const fileName = req.params.name;
    const filePath = path.join(storageDir, fileName);
    console.log(filePath)
    return res.download(filePath, fileName, (err) => {
        if (err) {
            return res.status(404).json({
                error: {
                    message: "File not found."
                }
            })
        } else {
            console.log('File is downloaded.')
        }
    })

}

//Helpers
const insertDocuments = (db, items, callback) => {
    const collection = db.collection('files');
    collection.insertMany(items, (error, result) => {
        if (error) return console.log(error)
        callback(result);
    }
    );
};
