const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const myFilename = name.substr(0, name.lastIndexOf(".")) || name;
    const extension = MIME_TYPES[file.mimetype];
    callback(null, myFilename + Date.now() + "." + extension);
  },
});

module.exports = multer({ storage }).single("image");
