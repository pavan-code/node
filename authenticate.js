var passport = require("passport");
var localStrategy = require("passport-local").Strategy;
var user = require("./models/user");
var jwtStrategy = require("passport-jwt").Strategy;
var extractJwt = require("passport-jwt").ExtractJwt;
var jwt = require("jsonwebtoken"); 

var config = require("./config");

exports.local = passport.use(new localStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

exports.getToken = function (user) {
  return jwt.sign(user, config.secretKey, {
    expiresIn: 3600, 
  });
};

var opts = {};
opts.jwtFromRequest = extractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(new jwtStrategy(opts, function(jwt_payload, done) {
    // console.log("jwt payload : ", jwt_payload);
    user.findOne({_id : jwt_payload._id}, (err, user) => {
        if(err) {
            return done(err, false);
        }
        else if(user) {
            return done(null, user);
        }
        else {
            return done(null, false);
        }
    })

}));

exports.verifyUser = passport.authenticate('jwt', { session : false})

exports.verifyAdmin = (req, res, next)=> {
    // console.log("admin: ",req.user.admin);
    if(req.user.admin) {
        // console.log("admin active");
        next();
    }
    else {
        var err = new Error('You are not authorized to perform this operation!');
        err.status = 403;
        return next(err);
    }
}