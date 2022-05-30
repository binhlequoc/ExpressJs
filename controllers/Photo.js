module.exports = (app, db) => {
    app.get("/myphotos", (req, res) => {

        res.render("myphotos", db());
    });

    app.get("/addphoto", (req, res) => {
        res.render("addphoto.pug", db());
    })

}