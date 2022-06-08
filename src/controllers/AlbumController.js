const AlbumModel = require("../model/AlbumModel");
const fs = require('fs');
const { viewsPath } = require("../config/Path.js");
const { model } = require("mongoose");
const POST_PER_PAGE = 20;
module.exports = {
    getAlbums: async (req, res) => {
        let page = Number(req.query.page);
        if (!page) page = 1;
        if (page < 1) page = 1;
        let skip = (page - 1) * 20;
        try {
            const albums = await AlbumModel.find({ user: req.user._id }).skip(skip).limit(POST_PER_PAGE);
            const count = await AlbumModel.count({ user: req.user._id });
            const numberAlbum = Math.ceil(count / POST_PER_PAGE);
            if (page > numberAlbum) page = numberAlbum;
            res.render(viewsPath + "albums", { albums, user: req.user, numberAlbum, page });
        } catch (err) {

        }

    },
    getAddAlbum: (req, res) => {
        res.render(viewsPath + "addalbum", { user: req.user, });
    },
    getEditAlbum: async (req, res) => {
        try {
            const album = await AlbumModel.findById(req.params.id);
            res.render(viewsPath + "editalbum", { user: req.user, album });
        } catch (err) {

        }

    },
    createAlbum: async (req, res) => {
        try {
            const album = new AlbumModel({
                title: req.body.title,
                description: req.body.description,
                isPublic: req.body.sharingMode == false,
                images: req.body.images,
                user: req.user._id,
            });
            await album.save();
            res.redirect("/albums");
        } catch (err) {
            res.render(viewsPath + "addalbum", { user: req.user, validate: err.errors });
        }

    },
    deleteAlbum: async (req, res) => {
        try {
            const album = await AlbumModel.findByIdAndDelete(req.params.id);
            res.redirect('/albums');
        } catch (err) {

        }

    },
    updateAlbum: async (req, res) => {
        try {
            const album = await AlbumModel.findById(req.params.id);
            const albumUpdate = {
                title: req.body.title,
                description: req.body.description,
                isPublic: req.body.sharingMode == false,
                images: req.body.images,
            };
            await album.updateOne(albumUpdate);
            res.redirect("/albums");
        } catch (err) {

        }

    },


}