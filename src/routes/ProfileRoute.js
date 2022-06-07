const profileCtr = require('../controllers/ProfileController.js');
const uploadFile = require('../middleware/UploadFile.js');
const { body } = require('express-validator');
const express = require('express');
const UserModel = require("../model/UserModel");
const validateProfile = [
    body('firstName')
        .isLength({ max: 25 }).withMessage("Firstname is invalid"),
    body('lastName')
        .isLength({ max: 25 }).withMessage("Lastname is invalid"),
    body('email')
        .isEmail().withMessage("Email is invalid"),

];

const validatePassword = [
    body('currentPassword').custom(async (value, { req }) => {
        const user = await UserModel.findById(req.user._id);
        if (!user.comparePassword(value, user.password)) {
            throw new Error('Password is incorrect');
        }
        return true;
    }),
    body('newPassword')
        .isLength({ max: 64, min: 6 }).withMessage("Password is invalid"),
    body('passwordConfirm')
        .custom((value, { req }) => {
            if (value !== req.body.newPassword) {
                throw new Error('Password confirmation does not match password');
            }
            return true;
        }),
]
const router = express.Router();
router.get('/', profileCtr.getProfilePage);
router.put('/', uploadFile.single('file'), validateProfile, profileCtr.updateProfile);
router.put('/password', validatePassword, profileCtr.updatePassword);
module.exports = router;