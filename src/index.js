const express = require("express");
const app = express();
require("dotenv").config();
const routes = require("./routes.js");
const expressSession = require('express-session');
const methodOverride = require("method-override");
const mongoose = require('mongoose');
const passport = require('./config/Passport');
const PORT = process.env.PORT || 4000;

app.set('view engine', 'pug')
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(expressSession({ secret: 'keyboard cat' }))
app.use(expressSession({
    secret: "secret",
    saveUninitialized: true,
    resave: true,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }
}));
app.use(passport.initialize());
app.use(passport.session());

routes(app);



mongoose.Promise = global.Promise;
const uri = "mongodb+srv://binhlq:YMGn5uJKj2PPgUNN@cluster0.zp6i9.mongodb.net/Fotobook?retryWrites=true&w=majority"

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



