const PhotoModel = require("../model/PhotoModel")
module.exports = {
    get: (req, res) => {

    },
    create: async (req, res) => {
        if (!req.body.title) {
            res.redirect("/addphoto");
        }
        if (!req.file) {
            res.redirect("/addphoto");
        }


        try {
            const photo = new PhotoModel({
                title: req.body.title,
                description: req.body.desc,
                image: String(req.file.buffer),
                isPublic: req.body.sharingMode == false,

            });
            photo.save();
            res.render("")
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