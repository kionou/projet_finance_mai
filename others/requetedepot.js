const { soldeAdd,getPassword ,soldeTotal } = require("../public/javascripts/genererPassword");
const base = require("./database");



const dataDepot = class{


    static AllTransfert = (into)=>{

        return new Promise((resolve,reject)=>{
             let  sqle = "SELECT * FROM `transfert`  ";
             base.query(sqle,[into],(error,result)=>{
                if (result) {
                    resolve(result)
                } else {
                
                    reject(error)
                }
            })
        })
 
    }
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

    static AjouterMoney = (compte,into)=>{

         let ID_transaction = getPassword();
         let{id,numero,createAt,montant,numero_user,type_transaction}=compte
         let solde = soldeAdd(compte.montant,compte.solde);
          console.log('solde',solde);

    
        let  sqle = "UPDATE `compte` SET `solde`= ?,`user_numero`=?,`createAt`=?,`updateAt`=? WHERE  id = ?";
        base.query(sqle,[solde,numero,createAt ,new Date(),id],(error,result)=>{
            if (result) {
                return new Promise((resolve,reject)=>{
                     let  sqle = "INSERT INTO `transfert`(`ID_transaction`, `numero_transfert`, `nom_transfert`, `montant_recu`, `type_transaction`, `numero_user`, `createAt`, `updateAt`) VALUES (?,?,?,?,?,?,?,?) ";
                     base.query(sqle,[ID_transaction,numero,into.nom,montant,type_transaction,numero_user,new Date(),new Date()],(error,result)=>{
                        if (result) {
                            console.log('result',result);
                            resolve(result)
                        } else {
                            console.log('gxfgf',error);
                            reject(error)

                        }
                    })
                })
                
            } else {
                console.log('gxfgf',error);
            }
        })
       
    }

   

     static VerifNumero = (into)=>{
      
        return new Promise((resolve,reject)=>{
             let  sqle = "SELECT * FROM `users` WHERE `numero`= ? ";
             base.query(sqle,[into],(error,result)=>{
                if (result) {
                    resolve(result[0])
                } else {
                    reject(error)
                }
            })
        })
 
    }

    static Retrait = (into,compte)=>{
        console.log('into',into);
        console.log('compte',compte);
        let ID_transaction = getPassword();
        
        let{id,numero,montant,numero_user,type_transaction}=into
        let solde = soldeTotal(compte[0].solde,into.montant);
         console.log('solde',solde);

   
       let  sqle = "UPDATE `compte` SET `solde`= ?,`user_numero`=?,`createAt`=?,`updateAt`=? WHERE  id = ?";
       base.query(sqle,[solde,numero,compte[0].createAt ,new Date(),id],(error,result)=>{
           if (result) {
               return new Promise((resolve,reject)=>{
                    let  sqle = "INSERT INTO `transfert`(`ID_transaction`, `numero_transfert`, `nom_transfert`, `montant_recu`, `type_transaction`, `numero_user`, `createAt`, `updateAt`) VALUES (?,?,?,?,?,?,?,?) ";
                    base.query(sqle,[ID_transaction,numero,compte[0].users_id,montant,type_transaction,numero_user,new Date(),new Date()],(error,result)=>{
                       if (result) {
                           console.log('result',result);
                           resolve(result)
                       } else {
                           console.log('gxfgf',error);
                           reject(error)

                       }
                   })
               })
               
           } else {
               console.log('gxfgf',error);
           }
       })
       
 
    }
   

}


module.exports=dataDepot;