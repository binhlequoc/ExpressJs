const feedCtr = require("../controllers/FeedController.js");
const express = require("express");

const router = express.Router();
router.get("/", feedCtr.getFeeds);


module.exports = router;