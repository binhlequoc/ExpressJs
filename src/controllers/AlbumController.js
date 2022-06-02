const AlbumModel = require("../model/AlbumModel");
const fs = require('fs');
const { viewsPath } = require("../config/Path.js");

module.exports = {
    getAlbums: async (req, res) => {
        const albums = await AlbumModel.find();
        res.render(viewsPath + "albums", { albums });
    },
    createAlbum: async (req, res) => {

    },
    deleteAlbum: (req, res) => {

    },
    updateAlbum: (req, res) => {

    }

}