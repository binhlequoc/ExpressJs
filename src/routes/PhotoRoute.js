const { model } = require("mongoose");
const photoCtr = require("../controllers/PhotoController.js");
const uploadFile = require("../middleware/UploadFile.js");
const { viewsPath } = require("../config/Path.js");

module.exports = (app, db) => {
    app.get("/myphotos", (req, res) => {

        res.render(viewsPath + "myphotos", db());
    });

    app.get("/addphoto", (req, res) => {
        res.render(viewsPath + "addphoto.pug", db());
    })

    app.post("/addphoto", uploadFile.single("file"), photoCtr.create);

}