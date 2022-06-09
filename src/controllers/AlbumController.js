const AlbumModel = require("../model/AlbumModel");
const { viewsPath } = require("../config/Path.js");
const POST_PER_PAGE = 20;
module.exports = {
    getAlbums: async (req, res) => {
        let page = Number(req.query.page);
        if (!page) page = 1;
        if (page < 1) page = 1;
        let skip = (page - 1) * POST_PER_PAGE;
        try {
            const albums = await AlbumModel.find({ user: req.user._id }).skip(skip).limit(POST_PER_PAGE);
            const count = await AlbumModel.count({ user: req.user._id });
            const numberAlbum = Math.ceil(count / POST_PER_PAGE);
            if (page > numberAlbum) page = numberAlbum;
            return res.render(viewsPath + "albums", { albums, user: req.user, numberAlbum, page });
        } catch (err) {
            return res.status(400).json(err);
        }

    },
    getAddAlbum: (req, res) => {
        return res.render(viewsPath + "addalbum", { user: req.user, });
    },
    getEditAlbum: async (req, res) => {
        try {
            const album = await AlbumModel.findById(req.params.id);
            return res.render(viewsPath + "editalbum", { user: req.user, album, validate: req.flash('errorValidate') });
        } catch (err) {
            return res.status(400).json(err);
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
            return res.redirect("/albums");
        } catch (err) {
            return res.render(viewsPath + "addalbum", { user: req.user, validate: err.errors });
        }

    },
    deleteAlbum: async (req, res) => {
        try {
            const album = await AlbumModel.findByIdAndDelete(req.params.id);
            return res.redirect('/albums');
        } catch (err) {
            return res.status(400).json(err);
        }

    },
    updateAlbum: async (req, res) => {
        try {
            const album = await AlbumModel.findById(req.params.id);
            const albumUpdate = {
                title: req.body.title,
                description: req.body.description,
                isPublic: req.body.sharingMode == false,
                images: []
            };
            if (req.body.images) albumUpdate.images = req.body.images;

            const opts = { runValidators: true };
            await album.updateOne(albumUpdate, opts);
            return res.redirect("/albums");
        } catch (err) {
            let errList = Object.values(err.errors);
            req.flash('errorValidate', errList.toString());
            return res.redirect(`/albums/${req.params.id}/edit`)
        }

    },


}