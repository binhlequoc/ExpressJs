const authCtr = require("../controllers/AuthController.js");
const express = require("express");
const router = express.Router();

router.get("/signin", authCtr.getSigninPage);
router.get("/signup", authCtr.getSignupPage);
router.post("/signin", authCtr.signin);
router.post("/signup", authCtr.signup);

module.exports = router;

