const { viewsPath } = require("../config/Path.js");
module.exports = (app, db) => {
    app.get("/myalbums", (req, res) => {

        res.render(viewsPath + "myalbums", db());
    });
    app.get("/addalbum", (req, res) => {

        res.render(viewsPath + "addalbum.pug", db());
    })
}