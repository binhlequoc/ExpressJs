const profileCtr = require("../controllers/ProfileController.js");
const uploadFile = require("../middleware/UploadFile.js");
const express = require("express");

const router = express.Router();
router.get("/",profileCtr.getProfilePage);
router.put("/",profileCtr.updateProfile);
router.put("/password",profileCtr.updatePassword);
module.exports = router;