module.exports = (app, db) => {
    app.get("/myphotos", (req, res) => {

        res.render("myphotos", db());
    });

}