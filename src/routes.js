const photoRoute = require("./routes/PhotoRoute");
const albumRoute = require("./routes/AlbumRoute");
const authRoute = require("./routes/AuthRoute");
const feedRoute = require("./routes/FeedRoute");
const errorRoute = require("./routes/ErrorRoute");
const profileRoute = require("./routes/ProfileRoute");
const connectEnsureLogin = require('connect-ensure-login');
module.exports = (app) => {
    app.use("/auth", authRoute);
    app.use("/feeds", feedRoute);
    app.use("/photos", connectEnsureLogin.ensureLoggedIn("/auth/signin"), photoRoute);
    app.use("/albums", connectEnsureLogin.ensureLoggedIn("/auth/signin"), albumRoute);
    app.use("/profile", connectEnsureLogin.ensureLoggedIn("/auth/signin"), profileRoute);
    app.use("*", errorRoute);


}
