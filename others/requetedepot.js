const { soldeAdd } = require("../public/javascripts/genererPassword");
const base = require("./database");



const dataDepot = class{
    static AfficherCompte = (into)=>{
    
        return new Promise((resolve,reject)=>{
             let  sqle = "SELECT * FROM `compte` WHERE user_numero = ? ";
             base.query(sqle,[into],(error,result)=>{
                if (result) {
                    resolve(result)
                } else {
                
                    reject(error)
                }
             })
        })
 
    }

    static AjouterMoney = (into)=>{
        return new Promise((resolve,reject)=>{
            let{id,montant,numero,createAt}=into
            let solde = soldeAdd(into.solde,into.montant);
            console.log('eeeedd',solde);
        
            let  sqle = "UPDATE `compte` SET `solde`= ?,`user_numero`=?,`createAt`=?,`updateAt`=? WHERE  id = ?";
            base.query(sqle,[solde,numero,createAt ,new Date(),id],(error,result)=>{
                if (result) {
                    console.log('result',result);
                    resolve(result)
                } else {
                    console.log('gxfgf',error);
                    reject(error)

                }
            })
        })


    }

}


module.exports=dataDepot;