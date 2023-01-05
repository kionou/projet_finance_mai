const base = require("./database");
const bcrypt = require("bcrypt");
const { getCode } = require("../public/javascripts/genererPassword");




const dataAgent = class{

    static AllAgence = (into)=>{

        return new Promise((resolve,reject)=>{
             let  sqle = "SELECT * FROM `agence`  ";
             base.query(sqle,[into],(error,result)=>{
                if (result) {
                    resolve(result)
                } else {
                
                    reject(error)
                }
            })
        })
 
    }

    static VerifAgentUniqu = (into)=>{
      
        return new Promise((resolve,reject)=>{
             let  sqle = "SELECT * FROM `agence` WHERE `nom`= ? ";
             base.query(sqle,[into],(error,result)=>{
                if (result=='') {
                    resolve({message:'cet agence n\'existe pas '})
                } else {
                
                    reject({message:'Vous aviez déjà un compte merci ! ',error})
                }
            })
        })
 
    }

    static VerifAgenceCode = (into)=>{
      
        return new Promise((resolve,reject)=>{
             let  sqle = "SELECT * FROM `agence` WHERE `code`= ?  ";
             base.query(sqle,[into],(error,result)=>{
                if (result) {
                    resolve(result)
                } else{
                    resolve(error)
                }
            })
        })
 
    }

    static AddAgence = (into)=>{
        console.log(into);
       
        let password = bcrypt.hashSync(into.password, 10);
        let code ="NITA_"+getCode()
        console.log(code);
        let{nom,numero,localisation}=into;
        return new Promise((resolve,reject)=>{
        let sql= "INSERT INTO `agence`( `nom`, `code`, `numero`,`localisation`,`password`, `createAt`, `updateAt`) VALUES (?,?,?,?,?,?,?)";
        base.query(sql,[nom,code,numero,localisation,password,new Date(),new Date()],(error,result)=>{
            if (result) {
                resolve(result) ;
                
            } else {
                console.log('errrorbase',error);
                reject(error) ;
            }

        })
    })
    }

   
   
}


module.exports=dataAgent;