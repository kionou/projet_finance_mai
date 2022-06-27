const { body } = require("express-validator");

exports.ValiderRegistre = [
    body('nom')
        .not()
        .isEmpty()
        .trim()
        .escape()
        .bail()
        .withMessage('Nom ne peut pas être vide')
        .isLength({min:5 , max:10})
        .withMessage('Minimun 5 caractères obligatoires')
        .isAlpha()
        .withMessage('Pas de chaine de caractères'),
    body('prenom')
        .not()
        .isEmpty()
        .trim()
        .escape()
        .bail()
        .withMessage('Prénom ne peut pas être vide')
        .isLength({min:5 , max:10})
        .withMessage('Minimun 5 caractères obligatoires')
        .isAlpha()
        .withMessage('Pas de chaine de caractères'),
    body('email')
        .notEmpty()
        .withMessage('e-mail  requis'),
    body('email')
        .exists()
        .isEmail()
        .withMessage('email non valide'),
    body('numero')
        .not()
        .isEmpty()
        .trim()
        .escape()
        .bail()
        .withMessage('Numéro de Téléphone obligatoire'),
        // .isMobilePhone(),
        // .withMessage('chiffres'),
        // .isAlpha()
        // .withMessage('Pas de chaine de caractères')
    body('password')
        .trim()
        .isLength({min:6, max:16})
       .withMessage('Le mot de passe doit comporter entre 6 et 16 caractères')
   


]


exports.validerConnection =[
body('numero')
    .not()
    .isEmpty()
    .trim()
    .escape()
    .bail()
    .withMessage('Numero de Téléphone obligatoire'),
body('password')
    .trim()
    .isLength({min:6, max:16})
   .withMessage('Le mot de passe doit comporter entre 6 et 16 caractères')

]

exports.validerTransfert =[
     body('nom')
        .not()
        .isEmpty()
        .trim()
        .escape()
        .bail()
        .withMessage('Nom ne peut pas être vide')
        .isLength({min:5 , max:10})
        .withMessage('Minimun 5 caractères obligatoires')
        .isAlpha()
        .withMessage('Pas de chaine de caractères'),
    body('prenom')
        .not()
        .isEmpty()
        .trim()
        .escape()
        .bail()
        .withMessage('Prenom ne peut pas être vide')
        .isLength({min:5 , max:10})
        .withMessage('Minimun 5 caractères obligatoires')
        .isAlpha()
        .withMessage('Pas de chaine de caractères'),
    body('numero')
        .not()
        .isEmpty()
        .trim()
        .escape()
        .bail()
        .withMessage('Numero de Telephone obligatoire')
        .isMobilePhone()
        .withMessage('Le numéro doit etre que des chiffres'),
    body('montant')
        .not()
        .isEmpty()
        .trim()
        .escape()
        .bail()
        .withMessage('Montant obligatoire')
       
]

exports.validerDepotNumber=[
     body('numero')
        .not()
        .isEmpty()
        .trim()
        .escape()
        .bail()
        .withMessage('Numero de Telephone obligatoire')
        .isMobilePhone()
        .withMessage('Le numéro doit etre que des chiffres'),
]

exports.validerDepotMontant=[
     body('montant')
        .not()
        .isEmpty()
        .trim()
        .escape()
        .bail()
        .withMessage('Montant  obligatoire')
       
]
