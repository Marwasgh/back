const mongoose = require('mongoose')
const bcrypt = require("bcrypt")
const Schema = mongoose.Schema;

const PersonneSchema =new Schema({
    
    nom: String,
    prenom: String,
    email: String,
    password : String,
    cin : Number,
    numtel: Number,
  
})

PersonneSchema.pre("save", function (next) {
    const user = this;
    if (!user.isModified("password")) {
      return next();
    }
  
    bcrypt.hash(user.password, 10, (error, hash) => {
      if (error) {
        return next(error);
      }
      user.password = hash;
      next();
    });
  });


  
  
module.exports= mongoose.model('personne',PersonneSchema)