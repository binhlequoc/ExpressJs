const PhotoModel = require("../model/PhotoModel");
const fs = require('fs');
const { viewsPath } = require("../config/Path.js");

module.exports = {
    getPhotos: async (req, res) => {
        const photos = await PhotoModel.find({ user: req.user._id });
        res.render(viewsPath + "photos", { user: req.user, photos });
    },
    getAddPhotos: async (req, res) => {

        res.render(viewsPath + "addphoto");
    },
    getEditPhoto: async (req, res) => {
        const photo = await PhotoModel.findOne({ _id: req.params.id });

        res.render(viewsPath + "editphoto", { user: req.user, photo });
    },
    createPhoto: async (req, res) => {

        try {
            const photo = new PhotoModel({
                title: req.body.title,
                description: req.body.desc,
                image: "data:image/png;base64, " + req.file.buffer.toString("base64"),
                isPublic: req.body.sharingMode == false,
                user: req.user._id,
            });
            photo.save();
            res.render("")
        }
        catch (err) {
            console.log(err);
        }

        res.render(viewsPath + "addphoto", { user: req.user });
    },
    delete: async (req, res) => {
        return res.send(req.params.id);
        const photos = await PhotoModel.findByIdAndDelete(req.params.id);
        res.redirect("/photos");
    },
    updatePhoto: (req, res) => {

    }

}