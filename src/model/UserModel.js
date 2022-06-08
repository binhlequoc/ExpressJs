const mongoose = require('mongoose');
const bcrypt = require("bcrypt-nodejs");
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: "/img/usericon.png",
    },

}, { timestamps: true });

userSchema.methods.encryptPassword = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(6));
}

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);

}

module.exports = mongoose.model("User", userSchema);