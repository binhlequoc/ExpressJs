module.exports = (app, db) => {
    app.get("/myalbums", (req, res) => {

        res.render("myalbums", db());
    });

}