var express = require('express');
const controlleuragent = require('../controllers/agentControlleur');
const { ValiderAgence , validerConnectionAgnece ,validerDepotNumber} = require('../middleware/validator');

controlleuragent

var router = express.Router();


router.get('/',controlleuragent.AgentGet);
router.post('/',validerConnectionAgnece,controlleuragent.Login);
router.get('/transaction',controlleuragent.TransactionGet);
router.post('/transaction',validerDepotNumber,controlleuragent.TransactionPost);
router.get('/valider_transaction',controlleuragent.ValiderGet);
router.post('/valider',validerDepotNumber,controlleuragent.ValiderPost);


router.get('/logout',controlleuragent.logout);




router.post('/inscription',ValiderAgence,controlleuragent.AgentPost)





module.exports=router;