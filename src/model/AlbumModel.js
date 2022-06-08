const mongoose = require('mongoose');
const TITLE_LENGTH_MAX = 140;
const DESCRIPTION_LENGTH_MAX = 300;
const albumSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title can't be empty!"],
        validate: {
            validator: function (title) {
                return title.length <= TITLE_LENGTH_MAX;
            },
            message: "Title must have maximum 140 characters long!",
        }
    },
    description: {
        type: String,
        validate: {
            validator: function (description) {
                return description.length <= DESCRIPTION_LENGTH_MAX;
            },
            message: "Description must have maximum 300 characters long!",
        }
    },
    images: {
        type: mongoose.Schema.Types.Array,
        required: [true, "Image can't be empty!"],
        validate: {
            validator: function (images) {
                return images.length >= 1;
            },
            message: "Image can't be empty!",
        }
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