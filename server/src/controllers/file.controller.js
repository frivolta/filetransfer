//Load Schema and Dependencies
import _ from 'lodash';
import path from 'path';
const File = require('../models/File');
const Post = require('../models/Post');
const MongoClient = require('mongodb');
import mongoose from 'mongoose';

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
        //Get Post Model data:
        console.log('Request: ', req.files)

        //Insert into db
        MongoClient.connect(url, (err, client) => {
            // Client returned
            const db = client.db('filetransfer-app');
            insertDocuments(db, filesArray, (result) => {
                const newPost = {
                    from: req.body.from,
                    to: req.body.to,
                    files: result.insertedIds
                }
                Post.create(newPost, (err, res) => console.log(res))
                console.log('Insert successful', result);
            })
        });
        res.json({
            message: filesArray
        });
    } else {
        res.json({
            error: {
                message: 'No file selected'
            }
        });
    }
}


// @route   GET api/download/:id
// @desc    Download file from route id
// @access  Public
exports.api_download = async (req, res) => {
    const fileId = req.params.id;
    const collection = await File.findOne({ _id: fileId });
    const filename = await _.get(collection, 'filename')
    const filePath = path.join(storageDir, filename);
    return res.download(filePath, _.get(result, '[0].originalName'), (err) => {
        if (err) {
            return res.status(404).json({
                error: {
                    message: "File not found."
                }
            })
        } else {
            return res.status(200).json({
                message: "File has been downloaded"
            })
        }
    })
}

// @route   GET api/post/:id
// @desc    Get post details
// @access  Public

exports.api_post_detail = async (req, res) => {
    const postId = req.params.id;
    let filesArray = [];

    try {
        const post = await Post.findOne({ _id: postId });
        const fileIds = await post.files;
        _.each(fileIds, (value, key) => {
            filesArray.push(value[key]);
        })
        const files = await File.find({ _id: { $in: filesArray } })
        res.json({ files: files })
    } catch (err) {
        res.status(404).json({ error: err })
    }
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
