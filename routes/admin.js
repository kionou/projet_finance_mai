var express = require('express');
const controlleurAdmin = require('../controllers/admincontrolleur');

var router = express.Router();


router.get('/',controlleurAdmin.AdminGet);
 router.post('/',controlleurAdmin.AdminPost);
 router.get('/dashboard',controlleurAdmin.dashboard);







module.exports=router;