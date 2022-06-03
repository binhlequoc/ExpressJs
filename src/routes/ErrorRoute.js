const errorCtr = require("../controllers/ErrorController.js");
const express = require("express");

const router = express.Router();
router.get("/", errorCtr.getError);

module.exports = router;