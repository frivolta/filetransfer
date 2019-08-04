const express = require('express');
const router = express.Router();
import multer from 'multer';
import path from 'path';

//Import controller
const fileController = require('../../controllers/file.controller');

//File storage config
const storageDir = path.join(__dirname, '../..', 'storage');
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

// @route   GET api/
// @desc    Test Api Route
// @access  Public
router.get('/', fileController.api_test);

// @route   POST api/upload
// @desc    Upload file route
// @access  Public
router.post("/upload", upload.array('files'), fileController.api_upload);

// @route   GET api/download/:id
// @desc    Download file from route id
// @access  Public
router.get("/download/:id", fileController.api_download);

// @route   GET api/post/:id
// @desc    Get post details
// @access  Public
router.get("/posts/:id", fileController.api_post_detail);


module.exports = router;