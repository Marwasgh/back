const isEmpty=require('./isEmpty');
const validator = require('validator');
var passwordValidator = require('password-validator');
const bcrypt = require("bcrypt");


module.exports =function ValidateUser(data){

   let err = {}

   data.email = !isEmpty(data.email) ? data.email : ""
   data.nom = !isEmpty(data.nom) ? data.nom : ""
   data.prenom = !isEmpty(data.prenom) ? data.prenom : "" 
   data.cin = !isEmpty(data.cin) ? data.cin : ""
   data.numtel = !isEmpty(data.numtel) ? data.numtel : ""
   data.password = !isEmpty(data.password) ? data.password : ""


   


   if(!validator.isEmail(data.email)){
       err.email = "Forme Email obligatoire"; 
   }
   if(validator.isEmpty( data.password)){
       err.password = " Le mots de passe est obligatoire";
   }
   

   if(!(data.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)))
   {
    err.password =  (["Le mots de passe doit contient :" , "8 caractere " , "un Lettre majuscule" , "un caractere speciaux", "un chiffre"])
   }
   




   

   if(validator.isEmpty( data.email)){
    err.email = " Email obligatoire";
}
   if(validator.isEmpty(data.nom)){
       err.nom = "Nom obligatoire";
   }
   if(validator.isEmpty(data.prenom)){
       err.prenom = " Prenom obligatoire";
   }
   if(validator.isEmpty(data.cin)){
       err.cin = " Cin obligatoire";
   }
   if(data.cin.length != 8 ){
    err.cin = " Le numero de la carte d identite compose de 8 chiffre ";
   }
   if(data.cin.toString().length===8)
   {
      str= data.cin.toString();
      if((str[0]!= 0) && (str[0]!=1))
      {
        err.cin = " Le premier chiffre de cin doit etre 0 ou 1  ";
 
      }
   }
   if(validator.isEmpty(data.numtel)) {
    err.cin = " Numero de téléphone obligatoire";

    }
    
if(data.numtel.length != 8 ){
    err.numtel = " Le numero de telephone compose de 8 chiffre ";
   }
   if(data.numtel.toString().length === 8)
   {
      str= data.numtel.toString();
      if(str[0] != 5 && str[0] != 2 && str[0] != 9 && str[0] != 4  )
      {
        err.numtel = " Le premier chiffre de la numero du telephone  doit etre 5 ou 2 ou 4 ou 9  ";
 
      }
   }

   return{
       err,
       isValid : isEmpty(err)
   }
}