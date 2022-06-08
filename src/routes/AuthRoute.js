const authCtr = require("../controllers/AuthController.js");
const express = require("express");
const { body, validationResult } = require('express-validator');
const router = express.Router();
const passport = require('../config/Passport');
const validateSignup = [
    body('firstName')
        .isLength({ max: 25 }).withMessage("Firstname is invalid"),
    body('lastName')
        .isLength({ max: 25 }).withMessage("Lastname is invalid"),
    body('email')
        .isEmail().withMessage("Email is invalid"),
    body('newPassword')
        .isLength({ max: 64, min: 6 }).withMessage("Password is invalid"),
    body('passwordConfirm')
        .custom((value, { req }) => {
            if (value !== req.body.newPassword) {
                throw new Error('Password confirmation does not match password');
            }
            return true;
        }),
];


router.get("/signin", authCtr.getSigninPage);

router.get("/signup", authCtr.getSignupPage);

router.post("/signin", passport.authenticate('local', { successRedirect: '/feeds', failureRedirect: '/auth/signin' }), authCtr.signin);

router.post("/signup", validateSignup, authCtr.signup);
router.get("/logout", authCtr.logout);

module.exports = router;

