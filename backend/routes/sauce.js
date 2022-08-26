const express = require('express');
const router = express.Router();
const sauceController = require('../controllers/sauce');
const auth = require('../middelware/auth');
const multer = require('../middelware/multer-config')

router.post('/', auth, multer, sauceController.createSauce);
router.get('/', auth, sauceController.findSauces);
router.get('/:id', auth, sauceController.findOneSauce);
router.put('/:id', auth, multer, sauceController.modifySauce);
router.delete('/:id', auth, sauceController.deleteSauce);
router.post('/:id/like', auth, sauceController.like);
///créer 4 routes : 1.toutes les sauces, 2.une sauce en prenant comme para l'id, 3.modifier une sauce, 4.supprimer une sauce


module.exports = router;