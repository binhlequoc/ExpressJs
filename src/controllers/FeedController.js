const PhotoModel = require("../model/PhotoModel");
const AlbumModel = require("../model/AlbumModel");
const { viewsPath } = require("../config/Path.js");
const date = require('date-and-time');
const POST_PER_PAGE = 20;
module.exports = {
    getFeeds: async (req, res) => {
        const filter = req.query.filter;
        let page = Number(req.query.page);
        if (!page) page = 1;
        if (page < 1) page = 1;
        let skip = (page - 1) * POST_PER_PAGE;

        if (!filter) {
            return res.redirect("?filter=photos");
        }
        if (filter === "photos") {
            try {
                const photos = await PhotoModel.find({ isPublic: true }).skip(skip).limit(POST_PER_PAGE).populate("user");
                const count = await PhotoModel.count({ isPublic: true });
                const numberPhoto = Math.ceil(count / POST_PER_PAGE);
                if (page > numberPhoto) page = numberPhoto;
                photos.forEach((value, index) => {

                    value.date = date.format(value.createdAt, "h:mm A DD/MM/YYYY");
                })

                return res.render(viewsPath + "feeds", {
                    button: "photos",
                    photos,
                    user: req.user,
                    numberPhoto,
                    page,
                });

            } catch (err) {
                return res.status(400).json(err);
            }

        }
        if (filter === "albums") {
            try {
                const albums = await AlbumModel.find({ isPublic: true }).skip(skip).limit(POST_PER_PAGE).populate("user");
                const count = await AlbumModel.count({ isPublic: true });
                const numberAlbum = Math.ceil(count / POST_PER_PAGE);
                if (page > numberAlbum) page = numberAlbum;
                albums.forEach((value, index) => {
                    value.date = new Date(value.createdAt).toDateString();
                })
                return res.render(viewsPath + "feeds", {
                    button: "albums",
                    albums,
                    user: req.user,
                    numberAlbum,
                });
            } catch (err) {
                return res.status(400).json(err);
            }

        }

    },


}