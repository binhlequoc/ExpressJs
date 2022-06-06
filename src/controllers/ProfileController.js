const { viewsPath } = require("../config/Path.js");
const UserModel = require("../model/UserModel");
const { validationResult } = require('express-validator');
module.exports = {
    getProfilePage: (req, res) => {
        res.render(viewsPath + "profile", { user: req.user });
    },
    updateProfile: async (req, res) => {
        const errors = validationResult(req);
        const user = await UserModel.findById(req.user._id);
        const userUpdate = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,

        }

        console.log(errors);
        if (req.file) {
            userUpdate.image = 'data:image/png;base64, ' + req.file.buffer.toString('base64');
        }

        await user.updateOne({ $set: userUpdate });
        res.render(viewsPath + "profile", { validate: errors.errors });
    },
    updatePassword: (req, res) => {
        const errors = validationResult(req);
        console.log(errors);
        res.redirect("/profile");
    }
}