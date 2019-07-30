//Load Schema and Dependencies
import _ from 'lodash';
const File = require('../models/File');

//Setup Const


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
            //Insert many files array
            File.collection.insertMany(filesArray, (err, result) => {
                if (err) {
                    return res.status(503).json({
                        error: {
                            message: err.toString()
                        }
                    })
                }
                return res.status.json({
                    files: filesArray
                })
            })
        })
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
