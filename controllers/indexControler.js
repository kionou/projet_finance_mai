const { request , response} = require("express");

const controlleurAccueil = class {
    static AccueilGet =(req=request,res=response) =>{
        console.log('bonjour')
        res.render('index')
    }

    static InscriptionGet =(req=request,res=response) =>{
        console.log('bonjour')
        res.render('connexion')
    }


    static GetTransfert =(req=request,res=response) =>{
        console.log('bonjour')
        res.render('transfert')
    }

    static GetValider =(req=request,res=response) =>{
        console.log('bonjour')
        res.render('valider')
    }

    static Historique =(req=request,res=response) =>{
        console.log('bonjour')
        res.render('historique')
    }
}



module.exports=controlleurAccueil;