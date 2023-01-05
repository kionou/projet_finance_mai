const { request, response } = require("express");
const { validationResult } = require("express-validator");
const dataAgent = require("../others/requeteagent");
const bcrypt = require("bcrypt");
const dataDepot = require("../others/requetedepot");



const controlleuragent = class {

       static AgentGet = (req = request, res = response) => {
              res.render('agent')
       }

       static Login = (req = request, res = response) => {
              const result = validationResult(req)
              if (!result.isEmpty() ) {
              const error = result.mapped()
              console.log('rrfrrkrk',error ); 
              res.render('agent',{alert:error})
             }else{
              console.log('req.body',req.body);
              dataAgent.VerifAgenceCode(req.body.code)
              .then(success =>{
                     if (success == '') {
                      res.render('agent',{alerte:'Code ou Mot de passe incorrect ! '})
                     }else{
                     let  dataAgence = {
                            id:success[0].id, 
                            nom:success[0].nom,
                   }
                    let passwordAgence = bcrypt.compare(req.body.password,success[0].password);
                     if ( passwordAgence){
                       req.session.Agence= dataAgence;
                       console.log('ma session est :',req.session);
                     //    res.redirect('/historique')
                     res.redirect('/agent/transaction')

                     } else{
                      res.render('agent',{alerte:'Mot de passe incorrect !'}) 
                   }

                     }
                  })
                  .catch(error =>{
                         console.log(error);
                  })
       
       }
       }

       static AgentPost = (req = request, res = response) => {
              const result = validationResult(req)
              if (!result.isEmpty() ) {
              const error = result.mapped()
              console.log('rrfrrkrk',error ); 
              res.render('agent',{alert:error})
             }else{
              console.log('reqbody',req.body);
              dataAgent.VerifAgentUniqu(req.body.nom).then(success=>{
                     console.log('success',success);
                     dataAgent.AddAgence(req.body)
                     .then(success =>{
                     //    console.log("success",success);
                     })
                     .catch(error =>{
                            console.log(error);
                     })
        
                     
                }).catch(error=>{
                    console.log('non',error);
              //       res.render('connexion',{alerte:error})
                })
       }
             
       }

       static TransactionGet = (req = request, res = response) => {
              if (req.session.Agence) {
                     res.render('verifier',{data:req.session.Agence})
                    } else {
                     res.redirect('/agent')
                    }
       }

       static TransactionPost = (req = request, res = response) => {

              const result = validationResult(req)
              if (!result.isEmpty()) {
                     const error = result.mapped()
                     console.log('rrfrrkrk', error);
                     if (req.session.Agence) {
                     res.render('verifier', {data:req.session.Agence,alert:error})
                            
                     } else {
              res.redirect('/agent')
                            
                     }
              } else {
                     console.log('bofjkb', req.body);
                     dataDepot.AfficherCompte(req.body.numero)
                            .then(success => {
                                   if (req.session.Agence) {
                                          res.render('depotArgent', { success,data:req.session.Agence ,type: req.body.type_transaction })

                                                 
                                          } else {
                                   res.redirect('/agent')
                                                 
                                          }
                                   
                            })
                            .catch(error => {
                                   console.log(error);
                            })
              }
            
       }

       static ValiderGet = (req = request, res = response) => {
              if (req.session.Agence) {
              res.render('depotArgent',{data:req.session.Agence})
                     
              } else {
                 res.redirect('/agent')    
              }
       } 

       static ValiderPost = (req = request, res = response) => {
              const result = validationResult(req)
              if (!result.isEmpty()) {
                     const error = result.mapped()
                     console.log('rrfrrkrk', error);
                     dataDepot.AfficherCompte(req.body.numero)
                            .then(success => {
                                   if (req.session.Agence) {
                                          res.render('depotArgent', { success,data:req.session.Agence, alert: error })
                                                 
                                          } else {
                                             res.redirect('/agent')    
                                          }
                            })
                            .catch(error => {
                                   console.log(error);
                            })
              } else {
                     console.log('bofxggdfjkb', req.body)
                     if (req.body. type_transaction === "depot") {
                            dataDepot.VerifNumero(req.body.numero)
                                   .then(success => {
                                          dataDepot.AjouterMoney(req.body,success)
                                                 res.redirect('/agent/transaction')     
                                   })
                                   .catch(error => {
                                          console.log(error);
                                   })

                     } else {
                            console.log("retrait");
                            dataDepot.AfficherCompte(req.body.numero)
                                   .then(success => {
                                        dataDepot.Retrait(req.body , success) 
                                                  res.redirect('/agent/transaction')     
                                   })
                                   .catch(error => {
                                          console.log(error);
                                   })

                     }

              }


       }


       static logout =  (req=request , res=response)=>{ 
              req.session.destroy() 
              res.redirect('/agent')
          }

      

     
}


module.exports = controlleuragent;