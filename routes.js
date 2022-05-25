const fs = require('fs');
const path = require("path");
const express = require("express");
const router = express.Router();

const controllerFolder = __dirname + '/controllers/';


const controllers = [];


ctrFiles = fs.readdirSync(controllerFolder);
ctrFiles.forEach(file => {
    if (path.extname(file) == ".js") {
        controllers.push(require("./controllers/" + file));
    }


});



controllers.forEach((controller) => {
    controller(router);
});


module.exports = router;