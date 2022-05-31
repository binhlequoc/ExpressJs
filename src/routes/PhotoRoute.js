const { model } = require("mongoose");
const photoCtr = require("../controllers/PhotoController.js")

module.exports = (app, db, viewsPath) => {
    app.get("/myphotos", (req, res) => {

        res.render(viewsPath + "myphotos", db());
    });

    app.get("/addphoto", (req, res) => {
        res.render(viewsPath + "addphoto.pug", db());
    })

    app.post("/addphoto", photoCtr.create)

}