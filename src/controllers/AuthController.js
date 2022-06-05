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

    getSigninPage: async (req, res) => {
        res.render(viewsPath + "auth", { message: true });
    },
    getSignupPage: async (req, res) => {

        res.render(viewsPath + "auth", { message: false, userData: new userData(req, res), validate: [] });
    },
    signin: async (req, res) => {

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
            user.save();
            res.redirect("/feeds");
        }

        res.render(viewsPath + "auth", { message: false, userData: new userData(req, res), validate: errors.errors });


    },


}