const base = require("./database");
const bcrypt = require("bcrypt");
const getPassword = require("../public/javascripts/genererPassword");



const dataUser = class{

    static VerifUserUniqu = (into)=>{
        console.log('fkgnflkdb ',into);
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
        let sql= "INSERT INTO `users`( `nom`, `prenom`, `email`, `numero`, `password`, `createAt`, `updateAt`) VALUES (?,?,?,?,?,?,?)";
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
        console.log('fkgnflkdb ',into);
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

    static Transfert = (into)=>{
        console.log('fkgnflkdb ',into);
        let ID_transaction = getPassword();
        let{numero,montant_recu,numero_user}=into
        return new Promise((resolve,reject)=>{
       let  sqle = "SELECT * FROM `users` WHERE `id`= ? ";
         base.query(sqle,[ID_transaction,numero,montant_recu,montant_total,numero_user,new Date(),new Date()],(error,result)=>{
             if (result) {
                 resolve(result)
             } else {
               
                 reject(error)
             }
         })
        })
 
    }

   
}


module.exports=dataUser;