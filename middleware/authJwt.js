const jwt = require('jsonwebtoken');
const config = require('../config/config');
const db = require("../model");
const User = db.user;

verifyToken = (req, res, next) =>{
    console.log('abccc')
    var token = req.headers["x-access-token"];
    console.log('token', token)


if(!token){
    return res.status(403)
              .send({message: 'No token provided'})
}

jwt.verify(token, config.secret, (err, decoded) =>{
    if(err){
        return res.status(401)
                  .send({message: 'Unauthorised'});
    }
    req.userId = decoded.id;
    next();
})
}

const authJwt = {
    verifyToken
  };
  module.exports = authJwt;