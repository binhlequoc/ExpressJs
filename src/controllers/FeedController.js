const PhotoModel = require("../model/PhotoModel");
const AlbumModel = require("../model/AlbumModel");
const fs = require('fs');
const { viewsPath } = require("../config/Path.js");

module.exports = {
    getFeeds: async (req, res) => {

        const photos = await PhotoModel.find();
        res.render(viewsPath + "feeds", { photos });
    },


}