const { request , response} = require("express");
const dataDepot = require("../others/requetedepot");

const controlleurdepot = class{
    static AccueilGet = (req=request,res=response) =>{
        res.render('verifier')
    }

    static AccueilPost = (req=request,res=response) =>{
        console.log('bofjkb',req.body);
        dataDepot.AfficherCompte(req.body.numero)
        .then(success =>{
          res.render('depotArgent',{success})
         })
         .catch(error =>{
                console.log(error);
         })
    }

    static ValiderGet = (req=request,res=response) =>{
        res.render('depotArgent')
    }

    static ValiderPost = (req=request,res=response) =>{
        console.log('bofxggdfjkb',req.body)
        dataDepot.AjouterMoney(req.body)
        res.redirect('/historique')
    }
}


module.exports=controlleurdepot;