const albumCtr = require("../controllers/AlbumController.js");
const uploadFile = require("../middleware/UploadFile.js");
const express = require("express");
const router = express.Router();

router.get("/", albumCtr.getAlbums);
router.get("/new", albumCtr.getAddAlbum);
router.post("/", uploadFile.array("file",25), albumCtr.createAlbum);
router.put("/:id", albumCtr.updateAlbum)
router.delete("/:id", albumCtr.deleteAlbum);

module.exports = router;