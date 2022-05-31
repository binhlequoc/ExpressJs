module.exports = (app, db, viewsPath) => {
    app.get("/myalbums", (req, res) => {

        res.render(viewsPath + "myalbums", db());
    });
    app.get("/addalbum", (req, res) => {

        res.render(viewsPath + "addalbum.pug", db());
    })
}