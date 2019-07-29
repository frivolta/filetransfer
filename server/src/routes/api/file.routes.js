const express = require('express');
const router = express.Router();

//Load Controller Dependencies
const fileController = require('../../controllers/file.controller');

// @route   GET api/
// @desc    Test Api Route
// @access  Public
router.get('/', fileController.api_test);


module.exports = router;