const express = require('express');
const passport = require('passport');
const session = require('express-session');
const bcrypt = require("bcrypt-nodejs");
const LocalStrategy = require('passport-local').Strategy;
const userModel = require("../model/UserModel");
const router = express.Router();
router.use(passport.initialize());
router.use(passport.session());


passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(function (id, done) {
    userModel.findById(id).then(function (user) {
        done(null, user);
    }).catch(function (err) {
        console.log(err);
    })
});
router.use(session({
    secret: "secret",
    saveUninitialized: true,
    resave: true
}));

passport.use(new LocalStrategy({
    usernameField: "email",
    passwordField: "password"
},
    async function (email, password, done) {
        console.log(email, password);
        await userModel.findOne({
            email: email
        }).then(function (user) {
            bcrypt.compare(password, user.password, function (err, result) {
                if (err) { return done(err); }
                if (!result) {
                    return done(null, false, { message: 'Incorrect email and password' });
                }
                console.log(user);
                return done(null, user);
            })
        }).catch(function (err) {
            return done(err);
        })
    }
));
router.use(passport.authenticate('local', { successRedirect: '/feeds', failureRedirect: '/auth/signin' }));
module.exports = router;

