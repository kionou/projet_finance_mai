const { request , response} = require("express");
const dataAdmin = require("../others/requeteAdmin");
const dataAgent = require("../others/requeteagent");
const dataDepot = require("../others/requetedepot");
const dataUser = require("../others/Requeteuser");



const controlleurAdmin = class {
    static AdminGet =(req=request,res=response) =>{
        res.render('admin')
    }

    static AdminPost =(req=request,res=response) =>{
        // res.render('admin')
        console.log('req',req.body);
        dataAdmin.VerifAdmin(req.body.nom)
        .then(success =>{
            console.log('success',success);
               if (success == '') {
                res.json({alert:'Code ou Mot de passe incorrect ! '})
               }else{
               let  dataAgence = {
                      id:success[0].id, 
                      nom:success[0].nom,
             }
               if (success[0].password === req.body.password){
                 req.session.Admin= dataAgence;
                 console.log('ma session est :',req.session);
               //    res.redirect('/historique')
                res.json({'ma session est :':req.session})

               } else{
                res.json({alert:'Mot de passe incorrect !'}) 
             }

               }
            })
            .catch(error =>{
                   console.log(error);
            })
 
 
    }

    static dashboard = async (req=request,res=response) =>{
        if (req.session.Admin) {
            let client =       await dataUser.AllUser();
            let agence =       await dataAgent.AllAgence();
            let transaction =  await dataDepot.AllTransfert();
            console.log('client',client,'agence',agence,'tran',transaction);
            
        res.render('dashboard')

            
        } else {
            res.redirect('/admin')
        }
    }

 
}



module.exports=controlleurAdmin;