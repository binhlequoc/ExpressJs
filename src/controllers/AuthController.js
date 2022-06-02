const { viewsPath } = require("../config/Path.js");
const { body, validationResult } = require('express-validator');
const validate = [
    body('firstName').isLength({ min: 25 }),
    body('lastName').isLength({ min: 25 }),
    body('email').isEmail(),
    body('newPassword').isLength({ max: 64 }),
    body('passwordConfirm').isLength({ max: 64 }),
];

module.exports = {
    getSigninPage: async (req, res) => {
        res.render(viewsPath + "auth", { message: true });
    },
    getSignupPage: async (req, res) => {
        res.render(viewsPath + "auth", { message: false });
    },
    signin: async (req, res) => {
        res.render(viewsPath + "auth", { message: true });
    },
    signup: async (req, res) => {
        res.render(viewsPath + "auth", { message: false });
    }

}