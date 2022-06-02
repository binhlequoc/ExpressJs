const feedCtr = require("../controllers/FeedController.js");
const uploadFile = require("../middleware/UploadFile.js");
const express = require("express");

const router = express.Router();
router.get("/", feedCtr.getFeeds);


module.exports = router;