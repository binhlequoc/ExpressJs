const Multer = require("multer");
const FILE_SIZE = 5;//in MB
const upload = new Multer({
    limits: {
        fileSize: FILE_SIZE * 1024 * 1024
    }
});

module.exports = upload;