const { viewsPath } = require("../config/Path.js");
module.exports = (app, db) => {
    app.get("/home", (req, res) => {
        console.log(req.query.q);
        res.render(viewsPath + 'home', db());
    });

}