const express = require('express');

require('dotenv').config();
const routes = require('./routes.js');
const expressSession = require('express-session');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const passport = require('./config/Passport');
const flash = require('connect-flash');
const DB_MONGO = require('./config/DB.Config');

const PORT = process.env.PORT || 4000;
const app = express();
app.set('view engine', 'pug')
app.use(express.static(__dirname + '/public'));
app.use(express.json({ limit: '125mb' }));
app.use(express.urlencoded({ extended: true, limit: '125mb' }));
app.use(methodOverride('_method'));
app.use(expressSession({ secret: 'keyboard cat' }))
app.use(expressSession({
    secret: 'secret',
    saveUninitialized: true,
    resave: true,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

routes(app);

const connect = function () {
    mongoose.connection
        .on('error', console.log)
        .on('disconnect', connect)
        .once('open', () => console.log('MongoDB Connection Succeeded.'))
    return mongoose.connect(DB_MONGO.url, { useNewUrlParser: true, keepAlive: 1 });
}

connect();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

});



