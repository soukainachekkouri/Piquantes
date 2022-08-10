const express = require('express');
const router = express.Router();
const sauceController = require('../controllers/sauce');
const auth = require('../middelware/auth');
const multer = require('../middelware/multer-config')

router.post('/', auth, multer, sauceController.createSauce);


module.exports = router;