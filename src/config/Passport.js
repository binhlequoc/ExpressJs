const passport = require('passport');
const bcrypt = require("bcrypt-nodejs");
const LocalStrategy = require('passport-local').Strategy;
const userModel = require("../model/UserModel");

passport.serializeUser((user, done) => {

    done(null, user._id)
})

passport.deserializeUser(function (id, done) {

    userModel.findById(id).then(function (user) {
        done(null, user);
    }).catch(function (err) {
        console.log(err);
    })
});


passport.use(new LocalStrategy({
    usernameField: "email",
    passwordField: "password"
},
    async function (username, password, done) {

        await userModel.findOne({
            email: username
        }).then(function (user) {
            bcrypt.compare(password, user.password, function (err, result) {
                if (err) {
                    return done(err);
                }
                if (!result) {

                    return done(null, false, { message: 'Incorrect email and password' });
                }
                return done(null, user);
            })
        }).catch(function (err) {
            return done(err);
        })
    }
));

module.exports = passport;

