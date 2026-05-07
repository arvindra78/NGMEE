const express = require('express');
const router = express.Router();
const mediaController = require('../controllers/mediaController');

router.post('/info', mediaController.getInfo);
router.get('/download', mediaController.download);

module.exports = router;
