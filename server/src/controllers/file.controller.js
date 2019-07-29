//Load Schema and Dependencies
import _ from 'lodash';
import path from 'path';


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
exports.api_upload = (req, res, next) => {
    console.log('File Uploaded', req.files)
}