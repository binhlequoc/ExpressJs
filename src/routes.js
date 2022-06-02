const photoRoute = require("./routes/PhotoRoute");
const albumRoute = require("./routes/AlbumRoute");
const authRoute = require("./routes/AuthRoute");
const feedRoute = require("./routes/FeedRoute");
const errorRoute = require("./routes/ErrorRoute");
module.exports = (app) => {
    app.use("/feeds", feedRoute);
    app.use("/photos", photoRoute);
    app.use("/albums", albumRoute);
    app.use("/auth", authRoute);
    app.use("*", errorRoute);


}
