const express=require('express');
const router =express.Router()
const {SignUp , FindAllpersonnes,FindSinglUser,UpdateUser,login}=require('../controllers/personne.controller.js')

router.post('/signup',SignUp)

router.post('/login',login)

router.get('/getpersonne',FindAllpersonnes)

router.get('/getpersonnebyId/:id',FindSinglUser)

router.put('/modifierPersonne/:id',UpdateUser)
//router.get('/logout',logout)

module.exports = router ;