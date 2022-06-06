const photoCtr = require("../controllers/PhotoController.js");
const uploadFile = require("../middleware/UploadFile.js");
const express = require("express");

const router = express.Router();
router.get("/", photoCtr.getPhotos);
router.post("/", uploadFile.single("file"), photoCtr.createPhoto);
// push multi files
// router.post("/", uploadFile.array("file",10), photoCtr.createPhoto);
router.get("/new", photoCtr.getAddPhotos);
router.get("/:id/edit", photoCtr.getEditPhoto);
router.put("/:id", uploadFile.single("file"),photoCtr.updatePhoto)
router.delete("/:id", photoCtr.delete);

module.exports = router;