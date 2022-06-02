const PhotoModel = require("../model/PhotoModel");
const fs = require('fs');
const { viewsPath } = require("../config/Path.js");
module.exports = {
    getPhotos: async (req, res) => {
        const photos = await PhotoModel.find();
        for (const p of photos) {
            p.image = new Buffer(p.image).toString("base64");

        }

        res.render(viewsPath + "photos", { photos });
    },
    getAddPhotos: async (req, res) => {


        res.render(viewsPath + "addphoto");
    },
    createPhoto: async (req, res) => {

    },
    delete: (req, res) => {

    },
    updatePhoto: (req, res) => {

    }

}