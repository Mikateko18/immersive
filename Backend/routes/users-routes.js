const express = require('express');
const { check } = require('express-validator');
const HttpError = require('../models/http-error');
const mongoose = require('mongoose');
const userSchema = require('../models/user')

const usersController = require('../controllers/users-controllers');

const router = express.Router();

const User = new mongoose.model("User", mongoose.userSchema);

router.get('/', usersController.getUsers);

router.post('/signup',
[check('name')
.not()
.isEmpty(),
check('email')
.normalizeEmail() // Test@test.com => test@test.com
.isEmail(),
check('password').isLength({ min: 5 })
], async (req, res, next) => {
  const email = req.body.email;

User.findOne({ email: req.body.email, },function(err,user) {
  
      if (user) {

        const error = new HttpError(
          'User exists already, please login instead.',
          422
        );
        return next(error);


      } else {
        const newUser= new User({
          name:req.body.name,
          email:req.body.email,
          password: req.body.password,
          image: "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
          models:[]
         

          //confirmPassword:req.body.confirmPassword,
          //confirmationCode: tokenn,

          
         
        });

        try {
           newUser.save();
        } catch (err) {
          const error = new HttpError(
            'Signing up failed, please try again.',
            500
          );
          return next(error);
        }
       
        //newUser.save();
        //sendMail(email,newUser.confirmationCode, newUser.FirstName);
        res.status(201).json({user: newUser.toObject({ getters: true })});
       
}
});
});



router.post('/login', usersController.login);

module.exports = router;
