var express = require('express');
const controlleurdepot = require('../controllers/depotControlleur');
const { validerDepotNumber , validerDepotMontant } = require('../middleware/validator');
var router = express.Router();


router.get('/',controlleurdepot.AccueilGet);
// router.post('/',validerDepotNumber,controlleurdepot.AccueilPost)


router.get('/valider_depot',controlleurdepot.ValiderGet);
router.post('/valider',validerDepotMontant,controlleurdepot.ValiderPost)



module.exports=router;