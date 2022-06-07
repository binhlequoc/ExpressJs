const AlbumModel = require("../model/AlbumModel");
const fs = require('fs');
const { viewsPath } = require("../config/Path.js");
const { model } = require("mongoose");

module.exports = {
    getAlbums: async (req, res) => {
        const albums = await AlbumModel.find();
        res.render(viewsPath + "albums", { albums, user: req.user, });
    },
    getAddAlbum: async (req, res) => {


        res.render(viewsPath + "addalbum", { user: req.user, });
    },
    getEditAlbum: async (req, res) => {
        const album = await AlbumModel.findById(req.params.id);
        res.render(viewsPath + "editalbum", { user: req.user, album });
    },
    createAlbum: async (req, res) => {
        const album = new AlbumModel({
            title: req.body.title,
            description: req.body.description,
            isPublic: req.body.sharingMode == false,
            images: req.body.images,
            user: req.user._id,
        });
        await album.save();
        res.redirect("/albums");
    },
    deleteAlbum: async (req, res) => {
        const album = await AlbumModel.findByIdAndDelete(req.params.id);
        res.redirect('/albums');
    },
    updateAlbum: async (req, res) => {
        const album = await AlbumModel.findById(req.params.id);
        const albumUpdate = {
            title: req.body.title,
            description: req.body.description,
            isPublic: req.body.sharingMode == false,
            images: req.body.images,
        };
        await album.updateOne(albumUpdate);
        res.redirect("/albums");
    },


}