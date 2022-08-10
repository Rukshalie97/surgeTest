const User = require('../models/user.model');
var nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'nodemailer',
    pass: 'ysbnmizgaplenvqq'
  }
});

var mailOptions = {
  from: 'nodemailer',
  to: 'tharudzrychell@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};


/**
 * Get User List Function.
 */
exports.users_list = function (req, res) {
	User.find(function(err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
};


/**
 * user login
 */
exports.user_login = function (req, res) {
	 User.findOne({user_name: req.body.user_name, password: req.body.password}, function(err, user) {
        if(err){
            res.status(404).send("Something went wrong"); 
        }
        if (!user)
            res.json({message:'Invalid credentials'});
        else{
            const token = jwt.sign(
                { user_id: user._id,email:user.email },
                "token",
                {
                  expiresIn: "2h",
                }
              );
              console.log(token,"token")
              user.token=token;
            res.json({user:user._doc,token});   
        }
    });
};


exports.user_create = function (req, res) {
    let user = new User(
        {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            mobile: req.body.mobile,
            email: req.body.email,
            user_name: req.body.user_name,
            password: req.body.password,
            account_type: req.body.account_type,
        }
    );
     user.save()
        .then(user => {
            // transporter.sendMail(mailOptions, function(error, info){
            //     if (error) {
            //       console.log(error);
            //     } else {
            //       console.log('Email sent: ' + info.response);
            //     }
            //   });
              res.status(200).json({'user': 'user added successfully'});
        })
        .catch(err => {
            console.log(err)
            res.status(400).send('adding new user failed');
        });
};