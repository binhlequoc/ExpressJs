const photoCtr = require("../controllers/PhotoController.js");
const uploadFile = require("../middleware/UploadFile.js");
const express = require("express");

const router = express.Router();
router.get("/", photoCtr.getPhotos);
router.post("/", uploadFile.single("file"), photoCtr.createPhoto);
router.get("/new", photoCtr.getAddPhotos);
router.put("/:id", photoCtr.updatePhoto)
router.delete("/:id", photoCtr.delete);
module.exports = router;