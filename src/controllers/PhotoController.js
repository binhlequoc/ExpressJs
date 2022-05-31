const PhotoModel = require("../model/PhotoModel")
module.exports = {
    get: (req, res) => {

    },
    create: async (req, res) => {
        if (!req.body.title) {
            res.redirect("/addphoto");
        }
        if (!req.body.file) {
            res.redirect("/addphoto");
        }


        try {
            const photo = await new PhotoModel({
                title: req.body.title,
                description: req.body.desc,
                image: req.body.file.buffer,
                isPublic: req.body.sharingMode == false,

            });
            photo.save();
            return res.json(photo);
        }
        catch (err) {
            console.log(err);
        }
    },
    delete: (req, res) => {

    },
    update: (req, res) => {

    }

}