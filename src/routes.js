const fs = require('fs');
const path = require("path");
const express = require("express");
const router = express.Router();
const db = require("./database/FakeDatabase");
const routeFolder = __dirname + '/routes/';
const routes = [];
ctrFiles = fs.readdirSync(routeFolder);
ctrFiles.forEach(file => {
    if (path.extname(file) == ".js") {
        routes.push(require("./routes/" + file));
    }

});

routes.forEach((route) => {
    try {
        route(router);
    }
    catch (err) {
        console.log(err);
    }

});

const viewsPath = "../src/views/";

module.exports = (app) => {
    routes.forEach((route) => {
        try {
            route(app, db, viewsPath);
        }
        catch (err) {
            console.log(err);
        }


    });
    app.get("*", (req, res) => {
        res.send("404 deo tim thay");
    })

}
