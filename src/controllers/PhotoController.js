const PhotoModel = require("../model/PhotoModel");
const fs = require('fs');
const { viewsPath } = require("../config/Path.js");
module.exports = {
    getPhotos: async (req, res) => {
        const photos = await PhotoModel.find();
        res.render(viewsPath + "photos", { photos });
    },
    getAddPhotos: async (req, res) => {


        res.render(viewsPath + "addphoto");
    },
    createPhoto: async (req, res) => {

        try {
            const photo = new PhotoModel({
                title: req.body.title,
                description: req.body.desc,
                image: req.file.buffer.toString("base64"),
                isPublic: req.body.sharingMode == false,

            });
            photo.save();
            res.render("")
        }
        catch (err) {
            console.log(err);
        }

        res.render(viewsPath + "addphoto");
    },
    delete: (req, res) => {

    },
    updatePhoto: (req, res) => {

    }

}