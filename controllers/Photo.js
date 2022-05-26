module.exports = (app) => {
    app.get("/photo", (req, res) => {

        res.render("photo");
    });

}