var express = require('express');
const controlleurAccueil = require('../controllers/indexControler');
const { ValiderRegistre ,validerConnection} = require('../middleware/validator');
var router = express.Router();



/* GET home page. */
router.get('/',controlleurAccueil.AccueilGet);
router.post('/',validerConnection,controlleurAccueil.AccueilPost);

router.get('/inscription',controlleurAccueil.InscriptionGet);
router.post('/inscription',ValiderRegistre,controlleurAccueil.InscriptionPost)

router.get('/transfert',controlleurAccueil.GetTransfert);
router.post('/transfert',controlleurAccueil.PostTransfert)

router.get('/confirmer_le_transfert',controlleurAccueil.GetValider);
router.post('/confirmer_le_transfert',controlleurAccueil.PostValider);

router.get('/historique',controlleurAccueil.Historique)

router.get('/logout',controlleurAccueil.logout)

module.exports = router;
