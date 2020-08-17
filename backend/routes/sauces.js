const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');
const saucesCtrl = require('../controllers/sauces');
const auth= require('../middleware/auth')

router.post('/',auth, multer,saucesCtrl.CreateSauces);
router.get('/',auth, saucesCtrl.getAllSauces);
router.get('/:id',auth, saucesCtrl.getOneSauces);
router.put('/:id',auth,multer, saucesCtrl.modifySauces);
router.delete('/:id', auth, saucesCtrl.deleteSauces);

module.exports = router;