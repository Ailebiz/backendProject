const express = require('express');
const router = express.Router();
const {
  getLanguages,
  getStatistics,
  createLanguage,
  updateLanguage,
  deleteLanguage
} = require('../controllers/languageController');

router.get('/languages', getLanguages);
router.get('/statistics', getStatistics);
router.post('/languages', createLanguage);
router.put('/languages/:id', updateLanguage);
router.delete('/languages/:id', deleteLanguage);

module.exports = router;
