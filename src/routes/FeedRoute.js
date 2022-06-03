const feedCtr = require("../controllers/FeedController.js");
const uploadFile = require("../middleware/UploadFile.js");
const express = require("express");

const router = express.Router();
router.get("/", (req, res, next) => {
    req.isAuthenticated(() => {
        next();
    })
    res.redirect("/auth/signin");
}, feedCtr.getFeeds);


module.exports = router;