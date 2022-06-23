const  Sequelize  = require("sequelize");
const sequelize = require("../others/database");



const users = sequelize.define('Users',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    nom:{
        type:Sequelize.STRING,
        allowNull:false,
        validate: {
          len: {
                 args:[2, 10],
                 msg:'Votre nom doit comporter au moins 2 lettre',
          },
          notEmpty: {
                 msg:'Le champs du nom ne doit pas etre vide'
         },

          
          },    
    },
    prenom:{
        type:Sequelize.STRING,
        allowNull:false,
        validate: {
            checkLength(value) {
              if (value.length < 3) {
                throw new Error("Length must be 3 or greater!");
              }
            },
            notEmpty: { 
                msg:'Le champs du prenom ne doit pas etre vide'
            },
          },
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false,
        unique: {
            args:true,
            msg:'Cet mail existe déjà'
        },
        validate: {
            isEmail: {
              msg: "Veillez entrer un mail correct",
            },
            
          },
    },
    numero:{
         type:Sequelize.STRING,
        allowNull:false,
        unique:{
            args:true,
            msg:'Le numéro doit être unique'
        },
        validate: {
          len: {
                 args:[9, 20],
                 msg:'Votre numero doit comporter au moins 10 chiffres',
          },
          notEmpty: { 
            msg:'Le champs du numéro ne doit pas etre vide'
         },

          
          },    
    },
    password:{
       type:Sequelize.STRING,
        allowNull:false,
       
    },   
},{
    validate :{
       customValidator() {
        if ((this.password === this.nom) || (this.password === this.prenom) ) {
          throw new Error("mot de passe est identique au  nom ou au prenom");
        }
      }
    }
     
})

module.exports=users;
