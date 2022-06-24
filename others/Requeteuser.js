 const base = require("./database");
const bcrypt = require("bcrypt");
const { getPassword,soldeTotal } = require("../public/javascripts/genererPassword");


const dataUser = class{

    static VerifUserUniqu = (into)=>{
      
        return new Promise((resolve,reject)=>{
             let  sqle = "SELECT * FROM `users` WHERE `email`= ? ";
             base.query(sqle,[into],(error,result)=>{
                if (result=='') {
                    resolve({message:'success'})
                } else {
                
                    reject({message:'Deja inscrit ,essayé avec une autre adresse mail ! '})
                }
            })
        })
 
    }

    static InsertionUser = (into)=>{
       
        let password = bcrypt.hashSync(into.password, 10);
        let{nom,prenom,email,numero}=into;

        let sql= "INSERT INTO `users`( `nom`, `prenom`, `email`, `numero`,`password`, `createAt`, `updateAt`) VALUES (?,?,?,?,?,?,?)";
        base.query(sql,[nom,prenom,email,numero,password,new Date(),new Date()],(error,result)=>{
            if (result) {
                console.log('resulltte',result);
                return result;
                
            } else {
                console.log('errrorbase',error);
                return error;
            }

        })
    }

    static connectUser = (into) =>{
        return new Promise ((resolve,reject) =>{
             let sql =`SELECT * FROM users WHERE email = ?`;
                base.query(sql,[into.email],(err,result) =>{
                if (result) {
                    resolve(result[0])   
                } else {
                    reject({message:'Email ou le Mot de passe incorrect !'})   
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

    static VerifierUserNumber = (into)=>{

        return new Promise((resolve,reject)=>{
             let  sqle = "SELECT * FROM `users` WHERE `numero`= ? ";
             base.query(sqle,[into],(error,result)=>{
                if (result) {
                     console.log('result',result[0].solde);
                     resolve(result[0])
                } else {
                     console.log('gxfgf',error);
                     reject(error)

                }
             })
        })
 
    }

    static Transfert = (into,user)=>{

        let ID_transaction = getPassword();
        let{id,nom,prenom,email,numero,password,createAt}=user
        let{numero_transfert,nom_transfert,montant_recu,numero_user,type_transaction}=into;
        let solde = soldeTotal(user.solde,into.montant_recu);
    
      
        let  sqle = "INSERT INTO `transfert`(`ID_transaction`, `numero_transfert`, `nom_transfert`, `montant_recu`, `type_transaction`, `numero_user`, `createAt`, `updateAt`) VALUES (?,?,?,?,?,?,?,?) ";
        base.query(sqle,[ID_transaction,numero_transfert,nom_transfert,montant_recu,type_transaction,numero_user,new Date(),new Date()],(error,result)=>{
            if (result) {
                return new Promise((resolve,reject)=>{
                    let  sqle = "UPDATE `users` SET `nom`= ?,`prenom`=?,`email`=?,`numero`=?,`password`=?,`createAt`=?,`updateAt`=?,`solde`=? WHERE id = ? ";
                    base.query(sqle,[nom,prenom,email,numero,password,createAt,new Date(),solde,id],(error,result)=>{
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