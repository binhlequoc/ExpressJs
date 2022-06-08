const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
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
            message: "Description must have maximum 300 characters long!",
        }
    },
    image: {
        type: String,
        required: true,
    },
    isPublic: {
        type: Boolean,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });


module.exports = mongoose.model("Photo", photoSchema);