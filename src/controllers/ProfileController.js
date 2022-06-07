const { viewsPath } = require("../config/Path.js");
const UserModel = require("../model/UserModel");
const { validationResult } = require('express-validator');
module.exports = {
    getProfilePage: (req, res) => {
        res.render(viewsPath + "profile", { user: req.user });
    },
    updateProfile: async (req, res) => {
        const errors = validationResult(req);
        let message = "";
        if (errors.isEmpty()) {
            const user = await UserModel.findById(req.user._id);
            const userUpdate = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,

            }
            if (req.file) {
                userUpdate.image = 'data:image/png;base64, ' + req.file.buffer.toString('base64');
            }
            await user.updateOne({ $set: userUpdate });
            message = "Update successfully!"
        }

        res.render(viewsPath + "profile", { validate: errors.errors, user: req.user, message });
    },
    updatePassword: async (req, res) => {
        const errors = validationResult(req);
        let messagePassword = "";
        console.log(errors)
        if (errors.isEmpty()) {
            const user = await UserModel.findById(req.user._id);
            const userUpdate = {
                password: user.encryptPassword(req.body.newPassword),

            }
            await user.updateOne({ $set: userUpdate });
            messagePassword = "Update password successfully!"
        }

        res.render(viewsPath + "profile", { validatePassword: errors.errors, user: req.user, messagePassword });
    }
}