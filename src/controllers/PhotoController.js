const PhotoModel = require('../model/PhotoModel');
const fs = require('fs');
const { viewsPath } = require('../config/Path.js');
const POST_PER_PAGE = 20;
module.exports = {
    getPhotos: async (req, res) => {
        let page = Number(req.query.page);
        if (!page) page = 1;
        if (page < 1) page = 1;
        let skip = (page - 1) * 20;
        try {
            const photos = await PhotoModel.find({ user: req.user._id }).skip(skip).limit(POST_PER_PAGE);
            const count = await PhotoModel.count({ user: req.user._id });
            const numberPhoto = Math.ceil(count / POST_PER_PAGE);
            if (page > numberPhoto) page = numberPhoto;
            res.render(viewsPath + 'photos', { user: req.user, photos, numberPhoto, page, });
        } catch (err) {

        }

    },
    getAddPhotos: (req, res) => {

        res.render(viewsPath + 'addphoto', { user: req.user });
    },
    getEditPhoto: async (req, res) => {
        try {
            const photo = await PhotoModel.findOne({ _id: req.params.id });
            res.render(viewsPath + 'editphoto', { user: req.user, photo, validate: req.flash('errorValidate') });
        } catch (err) {

        }

    },
    createPhoto: async (req, res) => {

        try {
            const photoCre = {
                title: req.body.title,
                description: req.body.desc,
                isPublic: req.body.sharingMode == false,
                user: req.user._id,
            }
            console.log(req.file);
            if (req.file)
                photoCre.image = 'data:image/png;base64, ' + req.file.buffer.toString('base64')
            const photo = new PhotoModel(photoCre);
            await photo.save();
            res.redirect('/photos');
        }
        catch (err) {
            res.render(viewsPath + 'addphoto', { user: req.user, validate: err.errors });
        }


    },
    delete: async (req, res) => {
        try {
            const photo = await PhotoModel.findByIdAndDelete(req.params.id);
            res.redirect('/photos');
        }
        catch (err) {
            res.render(viewsPath + 'editphoto', { user: req.user, validate: ["Can't delete photo!"] });
        }

    },
    updatePhoto: async (req, res) => {
        try {
            const photo = await PhotoModel.findById(req.params.id);
            const photoUpdate = {
                title: req.body.title,
                description: req.body.desc,
                isPublic: req.body.sharingMode == false,
                user: req.user._id,
            }
            if (req.file) {
                photoUpdate.image = 'data:image/png;base64, ' + req.file.buffer.toString('base64');
            }
            const opts = { runValidators: true };
            await photo.updateOne(photoUpdate, opts);
            res.redirect('/photos');
        }
        catch (err) {
            let errList = Object.values(err.errors);
            req.flash('errorValidate', errList.toString());
            res.redirect(`/photos/${req.params.id}/edit`)
        }

    }

}