const express = require("express");
const app = express();
require("dotenv").config();
const routes = require("./routes.js");
const expressSession = require('express-session');


const PORT = process.env.PORT || 4000;

app.set('view engine', 'pug')
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressSession({ secret: 'keyboard cat' }))
routes(app);

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const uri = "mongodb+srv://binhlq:YMGn5uJKj2PPgUNN@cluster0.zp6i9.mongodb.net/Fotobook?retryWrites=true&w=majority"
// Connect MongoDB at default port 27017.
mongoose.connect(uri, {
    useNewUrlParser: true,

}, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.')
    } else {
        console.log('Error in DB connection: ' + err)
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

});



