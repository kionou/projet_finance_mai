var express = require('express');
const controlleurAccueil = require('../controllers/indexControler');
var router = express.Router();


/* GET home page. */
router.get('/',controlleurAccueil.AccueilGet);
router.get('/inscription',controlleurAccueil.InscriptionGet);
router.get('/transfert',controlleurAccueil.GetTransfert);
router.get('/confirmer_le_transfert',controlleurAccueil.GetValider);
router.get('/historique',controlleurAccueil.Historique)

module.exports = router;
