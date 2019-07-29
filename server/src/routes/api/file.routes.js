const express = require('express');
const router = express.Router();
import multer from 'multer';
import path from 'path';

//Load Controller Dependencies
const fileController = require('../../controllers/file.controller');

// @route   GET api/
// @desc    Test Api Route
// @access  Public
router.get('/', fileController.api_test);

// @route   POST api/upload
// @desc    Upload file route
// @access  Public
router.post('/upload', fileController.api_upload)

module.exports = router;