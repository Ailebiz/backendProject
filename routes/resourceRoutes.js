const express = require('express');
const router = express.Router();
const resourceController = require('../controllers/resourceController');

router.get('/resources', resourceController.getResources);

module.exports = router;
