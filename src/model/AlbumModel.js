const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title can't be empty!"],
        validate: {
            validator: function (title) {
                return title.length <= 140;
            },
            message: "Title must have maximum 140 characters long!",
        }
    },
    description: {
        type: String,
        validate: {
            validator: function (description) {
                return description.length <= 300;
            },
            message: "Title must have maximum 300 characters long!",
        }
    },
    images: {
        type: mongoose.Schema.Types.Array,
        required: [true, "Image can't be empty!"],
    },
    isPublic: {
        type: Boolean,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "User can't be empty!"],
        ref: 'User'
    }
}, { timestamps: true });

module.exports = mongoose.model("Album", albumSchema);