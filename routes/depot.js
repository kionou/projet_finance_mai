var express = require('express');
const controlleurdepot = require('../controllers/depotControlleur');
var router = express.Router();

router.get('/',controlleurdepot.AccueilGet);
router.post('/',controlleurdepot.AccueilPost)

router.get('/valider_depot',controlleurdepot.ValiderGet);
router.post('/valider',controlleurdepot.ValiderPost)



module.exports=router;