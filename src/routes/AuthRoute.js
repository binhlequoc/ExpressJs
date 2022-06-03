const authCtr = require("../controllers/AuthController.js");
const express = require("express");
const { body, validationResult } = require('express-validator');
const router = express.Router();
const userModel = require("../model/UserModel");
const auth = require("../middleware/Authentication");
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
router.post("/signin", auth,
    function (req, res) {
        res.redirect("/feeds");
    });
router.post("/signup", validateSignup, authCtr.signup);
router.get("/logout", (req, res) => req.logout());

module.exports = router;

