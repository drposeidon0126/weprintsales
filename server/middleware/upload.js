var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './resources/assets')
  },
  filename: function (req, file, cb) {
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    cb(null, Date.now() + '.' + extension) //Appending .jpg
  }
})
var uploadFile = multer({ storage: storage }).any();

module.exports = uploadFile;