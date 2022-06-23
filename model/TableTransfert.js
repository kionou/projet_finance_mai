const  Sequelize  = require("sequelize");
const sequelize = require("../others/database");
const users = require("./TableUser");




const livres = sequelize.define('Livre',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    ID_transaction:{
        type:Sequelize.STRING,
        allowNull:false,
        unique: true,    
    },
    montant_transfert:{
        type:Sequelize.INTEGER,
        allowNull:false,
        
    },
    montant_total:{
        type:Sequelize.INTEGER,
        allowNull:false,    
    },
    numero_user: {
        type: Sequelize.INTEGER,
        allowNull:false,
        unique:true,
        references: { 
            model: users,
            key: 'numero'
        }
    }
})

module.exports=livres;

