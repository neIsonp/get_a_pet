const multer = require('multer');
const path = require('path');

const imageStore = multer.diskStorage({
    destination: function (req, file, cb) {

        let folder = "";

        if (req.baseUrl.includes('users')) {
            folder = "users";
        } else if (req.baseUrl.includes('pets')) {
            folder = "pets";
        }
        cb(null, `public/images/${folder}`);

    }, filename: function (req, file, cb) {

        cb(null, Date.now() + String(Math.floor(Math.random() * 1000)) + path.extname(file.originalname));
    }
})

const imageUpload = multer({
    storage: imageStore,
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
            return cb(new Error('please, just send jpg or png'));
        }
        cb(undefined, true);
    }
})

module.exports = { imageUpload }; 