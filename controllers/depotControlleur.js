const { request , response} = require("express");
const dataDepot = require("../others/requetedepot");
const { validationResult } = require("express-validator");


const controlleurdepot = class{
    static AccueilGet = (req=request,res=response) =>{
        res.render('verifier')
    }

    static AccueilPost = (req=request,res=response) =>{
          const result = validationResult(req)
        if (!result.isEmpty() ) {
        const error = result.mapped()
        console.log('rrfrrkrk',error ); 
        res.render('verifier',{alert:error})
       }else{
              console.log('bofjkb',req.body);
        dataDepot.AfficherCompte(req.body.numero)
        .then(success =>{
          res.render('depotArgent',{success})
         })
         .catch(error =>{
                console.log(error);
         })
       }
      
    }

    static ValiderGet = (req=request,res=response) =>{
        res.render('depotArgent')
    }

    static ValiderPost = (req=request,res=response) =>{
          const result = validationResult(req)
        if (!result.isEmpty() ) {
        const error = result.mapped()
        console.log('rrfrrkrk',error ); 
         dataDepot.AfficherCompte(req.body.numero)
        .then(success =>{
          res.render('depotArgent',{success,alert:error})
         })
         .catch(error =>{
                console.log(error);
         })
        // console.log('bodyyy',req.body);
        // res.render('depotArgent',{alert:error})
       }else{
              console.log('bofxggdfjkb',req.body)
        dataDepot.VerifNumero(req.body.numero)
         .then(success =>{
        dataDepot.AjouterMoney(req.body,success)
         res.redirect('/depot')
         })
         .catch(error =>{
                console.log(error);
         })
       }
      
       
    }
}


module.exports=controlleurdepot;