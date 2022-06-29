const { request , response} = require("express");
const dataUser = require("../others/Requeteuser");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");



const controlleurAccueil = class {
    static AccueilGet =(req=request,res=response) =>{
        res.render('index')
    }

    static AccueilPost = async (req=request,res=response) =>{
     
        const result = validationResult(req)
        if (!result.isEmpty() ) {
        const error = result.mapped()
        console.log('rrfrrkrk',error ); 
        res.render('index',{alert:error})
       }else{
        dataUser.connectUser(req.body)
        .then(success =>{
            let password = req.body.password;
            let  hash = success.password;
            let  dataUser = {
                   id:success.id, 
                   nom:success.nom,
                   numero:success.numero 
          }
           let passwordUser = bcrypt.compareSync(password,hash);
            if (  passwordUser){
              req.session.user= dataUser;
              console.log('ma session est :',req.session);
               res.redirect('/historique')
            } else{
             res.render('index',{alerte:'mot de passe incorrect'}) 
          }
        })
        .catch(error =>{
            console.log("errorrr",error)
            res.render('index',{alerte:'Numéro ou le Mot de passe incorrect !'})
        })
       }
    
    }

    static InscriptionGet =(req=request,res=response) =>{
        res.render('connexion')
    }

    static InscriptionPost = async (req=request,res=response) =>{
       
        const result = validationResult(req)
        if (!result.isEmpty() ) {
        const error = result.mapped()
        console.log('rrfrrkrk',error ); 
        res.render('connexion',{alert:error})
       }else{
        dataUser.VerifUserUniqu(req.body.numero).then(success=>{
             dataUser.InsertionUser(req.body)
             .then(success =>{
                dataUser.InsertionSolde(req.body.numero);
                res.redirect('/')
             })
             .catch(error =>{
                    console.log(error);
             })

        //    res.redirect('/')
             
        }).catch(error=>{
            console.log('non',error);
            res.render('connexion',{alerte:error})
        })
       }
    
    }


    static GetTransfert =(req=request,res=response) =>{
    //    if (req.session.user) {
        res.render('transfert',{data:req.session.user})
    //    } else {
    //     res.redirect('/')
    //    }
      
    }
    static PostTransfert =(req=request,res=response) =>{
          const result = validationResult(req)
        if (!result.isEmpty() ) {
        const error = result.mapped()
        console.log('rrfrrkrk',error ); 
        res.render('transfert',{alert:error})
       }else{
              let data ={...req.body}
            dataUser.AfficherUser(req.body.id)
            .then(success =>{
                    res.render('valider',{success,data})
                })
            .catch(error =>{
                    console.log(error);
                })
       }

     }

    static GetValider =(req=request,res=response) =>{
        if (req.session.user) {
            res.render('valider',{data:req.session.user})
        } else {
            res.redirect('/')
        }
        
    }

    static PostValider =(req=request,res=response) =>{
        dataUser.VerifierUserNumber(req.body.numero_transfert)
        .then(resultat =>{
                if (resultat== undefined) {
                    res.render('transfert',{error:"Ce numero na pas de compte"})
                } else {
                    dataUser.VerifierUserNumber(req.body.numero_user)
                    .then(success =>{
                        if (parseInt(success.solde) < parseInt(req.body.montant_recu)) {
                            res.render('transfert',{alerte:"Votre credit est insuffisant pour éffectuer ce transfert"})  
                        }else{
                            dataUser.Transfert(req.body,success)
                            dataUser.AjouterMoney(resultat,req.body.montant_recu)
                            res.redirect('/historique')
                        }
                                  
                    })
                    .catch(error =>{
                        console.log(error);
                    })
   
                }
        })
        .catch(error =>{
            console.log('errronumerber',error);
        })

    }

    static Historique =async (req=request,res=response) =>{
        if (req.session.user) {
        let transfert = await dataUser.AfficherTransfert(req.session.user.numero);
        let user = await dataUser.AfficherUser(req.session.user.id);
        let compte = await dataUser.AfficherCompte(req.session.user.numero);
                res.render('historique',{data:req.session.user,user,transfert,compte})
           
        } else {
            res.redirect('/')
        }
         
    }

    static Detail =  (req=request , res=response)=>{ 
        dataUser.AfficherDetailTransfert(req.params.id)
        .then(transfert =>{
            console.log("detail",transfert);
             res.render('detail',{transfert})       
        })
        .catch(error =>{
          console.log(error);
        })
    }

    static logout =  (req=request , res=response)=>{ 
        req.session.destroy() 
        res.redirect('/')
    }
}



module.exports=controlleurAccueil;