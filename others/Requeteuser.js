 const base = require("./database");
const bcrypt = require("bcrypt");
const { getPassword,soldeTotal } = require("../public/javascripts/genererPassword");


const dataUser = class{

    static VerifUserUniqu = (into)=>{
      
        return new Promise((resolve,reject)=>{
             let  sqle = "SELECT * FROM `users` WHERE `numero`= ? ";
             base.query(sqle,[into],(error,result)=>{
                if (result=='') {
                    resolve({message:'success'})
                } else {
                
                    reject({message:'Deja inscrit ,essayé avec une autre numéro ! '})
                }
            })
        })
 
    }

    static InsertionUser = (into)=>{
       
        let password = bcrypt.hashSync(into.password, 10);
        let{nom,prenom,email,numero}=into;
        return new Promise((resolve,reject)=>{
        let sql= "INSERT INTO `users`( `nom`, `prenom`, `email`, `numero`,`password`, `createAt`, `updateAt`) VALUES (?,?,?,?,?,?,?)";
        base.query(sql,[nom,prenom,email,numero,password,new Date(),new Date()],(error,result)=>{
            if (result) {
                console.log('resulltte',result);
                resolve(result) ;
                
            } else {
                console.log('errrorbase',error);
                reject(error) ;
            }

        })
    })
    }

    static InsertionSolde = (into)=>{
       
        let sql= "INSERT INTO `compte`(`user_numero`, `createAt`, `updateAt`)  VALUES (?,?,?)";
        base.query(sql,[into,new Date(),new Date()],(error,result)=>{
            if (result) {
                console.log('solde',result);
                return result;
                
            } else {
                console.log('errrorsolde',error);
                return error;
            }

        })
    }

    static connectUser = (into) =>{
        return new Promise ((resolve,reject) =>{
             let sql =`SELECT * FROM users WHERE numero = ?`;
                base.query(sql,[into.numero],(err,result) =>{
                if (result) {
                    resolve(result[0])   
                } else {
                    reject({message:'Numéro ou le Mot de passe incorrect !'})   
                }
             })
        })
        
    }

    static AfficherUser = (into)=>{
    
        return new Promise((resolve,reject)=>{
             let  sqle = "SELECT * FROM `users` WHERE `id`= ? ";
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

    static VerifierUserNumber = (into)=>{

        return new Promise((resolve,reject)=>{
             let  sqle = "SELECT * FROM `compte` WHERE user_numero = ? ";
             base.query(sqle,[into],(error,result)=>{
                if (result) {
                     console.log('result',result);
                     resolve(result[0])
                } else {
                     console.log('gxfgf',error);
                     reject(error)

                }
             })
        })
 
    }

    static Transfert = (into,compte)=>{

        let ID_transaction = getPassword();
        let{id,user_numero,createAt}=compte
        let{numero_transfert,nom_transfert,montant_recu,numero_user,type_transaction}=into;
        let solde = soldeTotal(compte.solde,into.montant_recu);
        console.log('eeee',solde);
    
      
        let  sqle = "INSERT INTO `transfert`(`ID_transaction`, `numero_transfert`, `nom_transfert`, `montant_recu`, `type_transaction`, `numero_user`, `createAt`, `updateAt`) VALUES (?,?,?,?,?,?,?,?) ";
        base.query(sqle,[ID_transaction,numero_transfert,nom_transfert,montant_recu,type_transaction,numero_user,new Date(),new Date()],(error,result)=>{
            if (result) {
                return new Promise((resolve,reject)=>{
                    let  sqle = "UPDATE `compte` SET `solde`= ?,`user_numero`=?,`createAt`=?,`updateAt`=? WHERE  id = ?";
                    base.query(sqle,[solde,user_numero,createAt ,new Date(),id],(error,result)=>{
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
               console.log('error',error);
               
            }
        })
       
 
    }

      static AfficherTransfert = (into)=>{

        return new Promise((resolve,reject)=>{
             let  sqle = "SELECT * FROM `transfert` WHERE numero_user = ? ";
             base.query(sqle,[into],(error,result)=>{
                if (result) {
                     console.log('resulttransfert',result);
                     resolve(result)
                } else {
                     console.log('gxfgf',error);
                     reject(error)

                }
             })
        })
 
    }

   
}


module.exports=dataUser;