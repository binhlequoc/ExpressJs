module.exports = (app, db) => {
    app.get("/home", (req, res) => {
        res.render('home', db());
    });

}