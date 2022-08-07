const express = require('express');
const router = express.Router();
const sauceController = require('../controllers/sauce');
const auth = require('../middelware/auth');

router.post('/', auth, sauceController.createSauce);

module.exports = router;