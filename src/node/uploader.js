const util = require("util");
const multer = require('multer');

class Uploader {

    constructor() {
        const fileStorage = multer.diskStorage({ 
            destination: function (req, file, cb) {
              cb(null, `./generatedP3nkd/files`)
            },
            filename: function (req, file, cb) {
              cb(null, Date.now() + '-' + file.originalname )
            }
          });

        this.upload = multer({ storage: fileStorage });
    }

    async startUpload(req, res) {
        let filename;

        try {
            const upload = util.promisify(this.upload.any());

            await upload(req, res);

            filename = req.files[0].filename;
        } catch (e) {
            //Handle your exception here
        }

        return res.json({fileUploaded: filename});
    }
}

module.exports = Uploader;