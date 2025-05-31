const multer = require("multer")
console.log("Multer Middleware Error ")
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // console.log(req)
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    // console.log(req,"reqreq")
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })
module.exports = upload
