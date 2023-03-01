const personnes = require('../models/personne.model')
const Validatepersonnes = require('../validation/personne.validation.js')
const bcrypt = require('bcryptjs');
const personneModel = require('../models/personne.model');


//SignUp
const SignUp = async (req, res) => {
 
  const { err, isValid } = Validatepersonnes(req.body);
  try {
    if (!isValid) {
      res.status(404).json(err)
    }
    else {
      personnes.findOne({ email: req.body.email })
        .then(async existe => {
          if (existe) {
            err.email = 'Personne Existe'
            res.status(404).json(err)
          }
          else {
            const personne = new personneModel({
              nom: req.body.nom,
              prenom: req.body.prenom,
              email: req.body.email,
              password: req.body.password,
              image:req.body.password
            })
            personne.save((err, personne) => {
              if (err) {
                res.status(201).json({
                  message: err
                })
              }
              res.status(201).json({
                message: 'Personne ajouter avec  succès'
              })
            }
            )
          
          }
        })
    }


  }
  catch (error) {
    console.log(error.message)
  }
}


//get all persons
const FindAllpersonnes = async (req, res) => {
  try {
    const data = await personnes.find()
    res.status(201).json(data)

  }
  catch (error) {
    console.log(error.message)
  }
}

const FindSinglUser = async (req, res) => {
  try {
    const data = await personnes.findOne({ _id: req.params.id })
    res.status(201).json(data)

  }
  catch (error) {
    console.log(error.message)
  }
}
//modifier personne


const UpdateUser =    async ( req , res ) => {
  const { err, isValid } = Validatepersonnes(req.body)

  try {
    bcrypt.hash(req.body.password, 10, (error, hash) => {
      if (error) {
        return next(error);
      }
      req.body.password = hash;

      

    })
    const data = await personnes.findOne({ _id: req.params.id })
    data.image = req.body.image

    if (!isValid) {
      res.status(404).json(err)
    }

    else {

      personnes.findOne({ email: req.body.email })
        .then(async existe => {
          if (existe) {
            const data = await personnes.findOne({ _id: req.params.id })
            if (data.email != req.body.email) {
              err.email = 'User Exist'
              res.status(404).json(err)
            }
            else {
              bcrypt.hash(req.body.password, 10, (error, hash) => {
                if (error) {
                  return next(error);
                }
                req.body.password = hash;

              })

              const data = await personnes.findOneAndUpdate(
                { _id: req.params.id },
                req.body,
                { new: true })

              res.status(201).json(data)
            }

          }

          else {
            const data = await personnes.findOneAndUpdate(
              { _id: req.params.id }, req.body,

              { new: true })

            res.status(201).json(data)
          }
        })
    }
  }
  catch (error) {
    console.log(error.message)
  }
}

//login
const login = async (req, res) => {
  try {
    const user = await personnes.findOne({ email: req.body.email });
    console.log(user);
    const cmp = await bcrypt.compare(req.body.password, user.password);
    if (!user) {
      res.send("aucun personne trouvé .");
    }
    if (!cmp) {
      res.send("Email ou password incorrect .");
    }

    if (user && cmp && !user.verified) {
      res.send("veuillez verifier votre email pour l'activation .");
    }

  }

  catch (error) {
    console.log(error.message)
  }
}







module.exports = {
  SignUp,
  FindAllpersonnes,
  FindSinglUser,
  UpdateUser,
  login

}