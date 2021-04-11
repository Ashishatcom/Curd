const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt
const Teacher = require('../models/teacher');
const constants = require('../config/constants');
let opts = {};
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = constants.ENVIROMENT.JWT_SECRET;
module.exports= (passport)=>{
   
    //  console.log({555:opts});
     passport.use(new JwtStrategy(opts,(jwt_payload,next)=>{
        //  console.log({tokennnnnnnnn:jwt_payload});
         Teacher.findOne({_id:jwt_payload.userId},(err,user)=>{
             console.log({djnhfjdhfj:user});
             if(err) return next(err,false);
             if(user) return next(null,user);
             return next (null,false)
         })
     }))
}


