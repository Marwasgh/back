
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
require('dotenv').config()
const personneroue = require('./routes/personne.route')
const session = require('express-session');
const passport = require("passport")



var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: true, 
    cookie: { secure: true }
  }));
app.use(passport.initialize());
app.use(passport.session());

//logout
app.post('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) 
      { return next(err); }
      res.redirect('/');
      console.log('+++++')
    });
  });


mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log('DB CONNECT'))
.catch(err=>console.log(err.message))


app.use('/',personneroue);
module.exports = app;
