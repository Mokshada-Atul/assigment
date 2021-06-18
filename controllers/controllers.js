const config = require('../config/config');
const db = require('../model');
const User = db.user;
const fs = require('fs');

var jwt = require('jsonwebtoken');
var bycrypt = require('bcryptjs');

exports.signup = (req, res) => {
    console.log('rew', req.body)
    const user= new User({
        username: req.body.username,
        email: req.body.email,
        password: bycrypt.hashSync(req.body.password, 8)
    });
console.log('user', user)
    user.save((err, save) => {
        if(err) {
            res.status(500)
               .send({message: err})
        }
        res.status(200)
        .send({message: user})
    })
}

exports.signin = (req, res) => {
    console.log("singnin is call",req.body.username);
    User.findOne({
        username: req.body.username
    }).exec((err, user)=>{
        if(err){
            res.status(500)
               .send({message: err})
               return;
        }

        if(!user) {
            res.status(404).send({message: 'User not found'})
            return;
        }

        var passwordValid = bycrypt.compareSync(req.body.password, user.password);
        console.log('req.body.password', req.body.password)
        console.log('user.password', user.password)
        console.log('passwordvalid', passwordValid)
        if(!passwordValid) {
            return res.status(401)
                           .send({accessToken: null,
                            message: "Invalid Password!"})
        }

        // var token = jwt.sign({ id: user.id }, config.secret, {
        //     expiresIn: 86400 // 24 hours
        //   });

          res.status(200).send({
              id: user._id,
              username:user.username,
              email: user.email,
          })
    })
}
 exports.uploadFiles=(req, res) =>{
        res.send({ message: "Successfully uploaded files" });
    }

    exports.deleteFile=(req,res)=>{
        fs.unlink("./public/file/uploads/"+req.file.filename, (err) => {
            if (err) {
                res.send({ message: err });
            } else {
                res.send({ message: "successfully deleted local file"});
            }
    });

    exports.getFile=(req,res)=>{
        let files = fs.readdirSync(__dirname);
        files.forEach(file => {
          res.send({message:file});
        });
    }
    }