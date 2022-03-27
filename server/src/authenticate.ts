

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
import User from './models/users';
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
import {Request, Response, NextFunction} from 'express';
var config = require('./config.ts');


passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = function(user: any) {
    return jwt.sign(user, config.secretKey);
};

interface Opts {
    jwtFromRequest: any;
    secretOrKey: any;
}

var opts: Opts = {
    jwtFromRequest: undefined,
    secretOrKey: undefined
};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(new JwtStrategy(opts,
    (jwt_payload: any, done: any) => {
        console.log("JWT payload: ", jwt_payload);
        User.findOne({_id: jwt_payload._id}, (err: any, user: any) => {
            if (err) {
                return done(err, false);
            }
            else if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    }));

exports.verifyUser = passport.authenticate('jwt', {session: false});

exports.verifyAdmin = function(req: any, res: Response, next:NextFunction) {
    if (req.user.role!=='Admin') {
        const err: any = new Error("You are not authorized to perform this operation!");
        err.status = 403;
        return next(err);
    }
    else {
        next();
    }
};