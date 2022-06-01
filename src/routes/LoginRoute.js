const { body, validationResult } = require('express-validator');
const { viewsPath } = require("../config/Path.js");
const validate = [
    body('firstName').isLength({ min: 25 }),
    body('lastName').isLength({ min: 25 }),
    body('email').isEmail(),
    body('newPassword').isLength({ max: 64 }),
    body('passwordConfirm').isLength({ max: 64 }),
];

module.exports = (app, db) => {

    app.route("/signin")
        .get((req, res) => {

            res.render(viewsPath + "login", { message: true });
        })
        .post((req, res) => {

            res.render(viewsPath + "login", { message: true });
        });
    app.route("/signup")
        .get((req, res) => {

            res.render(viewsPath + "login", { message: false });
        })
        .post(validate, (req, res) => {
            user = {
                firstName: req.body.firstName,
                lastName: req.body.firstName,
                newPassword: req.body.newPassword,
                passwordConfirm: req.body.newPassword,
            }

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.render("login", errors)

            }
            else res.redirect("/home");


            res.render(viewsPath + "login", { message: false });
        });
}