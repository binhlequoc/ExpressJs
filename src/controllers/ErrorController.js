const { viewsPath } = require("../config/Path.js");

module.exports = {
    getError: (req, res) => {
        res.render(viewsPath + "error/pagenotfound.pug");
    }

}