const PhotoModel = require("../model/PhotoModel");
const AlbumModel = require("../model/AlbumModel");
const fs = require('fs');
const { viewsPath } = require("../config/Path.js");
const { redirect } = require("express/lib/response");

module.exports = {
    getFeeds: async (req, res) => {
        if (!req.query.filter) {
            res.redirect("?filter=photos");
        }
        if (req.query.filter === "photos") {
            const photos = await PhotoModel.find({ isPublic: true }).populate("user");
            photos.forEach((value, index) => {
                value.date = new Date(value.createdAt).toDateString();
            })
            res.render(viewsPath + "feeds", {
                button: "photos",
                photos,
                user: req.user,
            });
        }
        if (req.query.filter === "albums") {
            const albums = await AlbumModel.find({ isPublic: true });
            albums.forEach((value, index) => {
                value.date = new Date(value.createdAt).toDateString();
            })
            res.render(viewsPath + "feeds", {
                button: "albums",
                albums,
                user: req.user,
            });
        }

    },


}