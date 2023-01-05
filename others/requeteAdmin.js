const base = require("./database");





const dataAdmin = class{

   
     


    static VerifAdmin = (into)=>{
      
        return new Promise((resolve,reject)=>{
             let  sqle = "SELECT * FROM `admin` WHERE `nom`= ?  ";
             base.query(sqle,[into],(error,result)=>{
                if (result) {
                    resolve(result)
                } else{
                    resolve(error)
                }
            })
        })
 
    }

   

   
   
}


module.exports=dataAdmin;