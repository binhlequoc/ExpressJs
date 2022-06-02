const { viewsPath } = require("../config/Path.js");

module.exports = {
    getError: async (req, res) => {
        res.render(viewsPath + "error/pagenotfound.pug");
    }

}