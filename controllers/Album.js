module.exports = (app, db) => {
    app.get("/myalbums", (req, res) => {

        res.render("myalbums", db());
    });
    app.get("/addalbum", (req, res) => {
        res.render("addalbum.pug", db());
    })
}