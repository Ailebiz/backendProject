const express = require('express');
const router = express.Router();
const { getLanguages, getStatistics } = require('../controllers/languageController');

router.get('/languages', getLanguages);
router.get('/statistics', getStatistics);

module.exports = router;
