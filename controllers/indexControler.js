const { request , response} = require("express");
const dataUser = require("../others/Requeteuser");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");



const controlleurAccueil = class {
    static AccueilGet =(req=request,res=response) =>{
        console.log('bonjour')
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
            res.render('index',{alerte:'Email ou le Mot de passe incorrect !'})
        })
       }
    
    }

    static InscriptionGet =(req=request,res=response) =>{
        console.log('bonjour')
        res.render('connexion')
    }

    static InscriptionPost = async (req=request,res=response) =>{
       
        const result = validationResult(req)
        if (!result.isEmpty() ) {
        const error = result.mapped()
        console.log('rrfrrkrk',error ); 
        res.render('connexion',{alert:error})
       }else{
        dataUser.VerifUserUniqu(req.body.email).then(success=>{
            
           dataUser.InsertionUser(req.body);
           res.redirect('/')
             
        }).catch(error=>{
            console.log('non',error);
            res.render('connexion',{alert:error})
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
       let data ={...req.body}
       dataUser.AfficherUser(req.body.id)
       .then(success =>{
              res.render('valider',{success,data})
        })
       .catch(error =>{
            console.log(error);
        })
   

       
     }

    static GetValider =(req=request,res=response) =>{
        if (req.session.user) {
            res.render('valider',{data:req.session.user})
        } else {
            res.redirect('/')
        }
        
    }

    static PostValider =(req=request,res=response) =>{
                console.log('vaiddder',req.body);
              dataUser.VerifierUserNumber(req.body.numero_user)
                .then(success =>{
                // res.render('historique',{data:req.session.user,success})
                    console.log('suuuusolde',success.solde);
                   dataUser.Transfert(req.body,success)

                })
                .catch(error =>{
                    console.log(error);
                })
    }

    static Historique =(req=request,res=response) =>{
        if (req.session.user) {
            dataUser.AfficherTransfert(req.session.user.numero)
            dataUser.AfficherUser(req.session.user.id)
            .then(success =>{
                res.render('historique',{data:req.session.user,success})
             })
            .catch(error =>{
                 console.log(error);
             })
            
        } else {
            res.redirect('/')
        }
        
    }

    static logout =  (req=request , res=response)=>{ 
        req.session.destroy() 
        res.redirect('/')
    }
}



module.exports=controlleurAccueil;