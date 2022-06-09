const { viewsPath } = require("../config/Path.js");
const { validationResult } = require('express-validator');
const userModel = require("../model/UserModel");

const userData = function (req, res) {
    this.firstName = req.body.firstName || "";
    this.lastName = req.body.lastName || "";
    this.email = req.body.email || "";
    this.newPassword = "";
    this.passwordConfirm = "";
}

module.exports = {

    getSigninPage: (req, res) => {
        return res.render(viewsPath + "auth", { message: true });
    },
    getSignupPage: (req, res) => {

        return res.render(viewsPath + "auth", { message: false, userData: new userData(req, res), validate: [] });
    },
    signin: (req, res) => {

    },
    signup: async (req, res) => {
        const errors = validationResult(req);

        if (errors.isEmpty()) {

            const user = new userModel({
                email: req.body.email,
                lastName: req.body.lastName,
                firstName: req.body.firstName,

            });
            user.password = user.encryptPassword(req.body.newPassword);
            await user.save();
            return res.redirect("/feeds");
        }

        return res.render(viewsPath + "auth", { message: false, userData: new userData(req, res), validate: errors.errors });


    },
    logout: (req, res) => req.logout(
        req.user, (err) => {
            if (err)
                return res.json(err);
            return res.redirect("/auth/signin");
        }
    ),


}