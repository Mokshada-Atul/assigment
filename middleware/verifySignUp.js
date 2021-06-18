const db = require('../model');
const User = db.user;

checkDuplicateNameOrEmail = (req, res) =>{
    //username
    console.log('req.body', req.body)
    //console.log('in checkkkkk 1', req)
    User.findOne({
        username : req.body.username
    }).exec((err, user) =>{
        if(err) {
            console.log('erooeerrrrrrrrr')
            res.status(500)
               .send({message: err})
               return;
        }
        if(user) {
            res.status(400)
               .send({message: 'Username  in use!!'})
               return;
        }
        //Email
        User.findOne({
            email : req.body.email
        }).exec((err, user) => {
            if(err) {
            console.log('email')

                res.status(500)
                   .send({message: err})
            }

            if(user) {
                res.status(400)
                   .send({message : 'Email already exists'})
            }
           // next();
        });
    });

};

const verifySignUp = {
    checkDuplicateNameOrEmail
  };
  console.log('in verifyyyyyyyy')
  module.exports = verifySignUp;






