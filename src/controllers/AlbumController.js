const AlbumModel = require("../model/AlbumModel");
const fs = require('fs');
const { viewsPath } = require("../config/Path.js");
const { model } = require("mongoose");
const POST_PER_PAGE = 20;
module.exports = {
    getAlbums: async (req, res) => {
        let page = Number(req.query.page);
        if (!page) page = 1;
        let skip = (page - 1) * 20;
        const albums = await AlbumModel.find({ user: req.user._id }).skip(skip).limit(POST_PER_PAGE);
        const count = await AlbumModel.count({ user: req.user._id });
        const numberAlbum = Math.ceil(count / POST_PER_PAGE);
        res.render(viewsPath + "albums", { albums, user: req.user, numberAlbum });
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