var express = require('express');
var app = express();
var multer = require('multer')
var cors = require('cors');

app.use(cors())

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'public/generatedP3nkd/img')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +file.originalname )
  }
})


var upload = multer({ storage: storage }).single('file')

app.post('/upload',function(req, res) {
     
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
          console.log("P3nkD uploaded.")
          return res.status(500).json(err)
      } else if (err) {
          console.log(err)
          return res.status(500).json(err)
      }
      return res.status(200).send(req.file)
    })

});

app.listen(8000, function() {
    console.log('P3nkDUploader is running (localhost:8000) ...');
});