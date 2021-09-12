var express = require('express');
var app = express();
var multer = require('multer')
var cors = require('cors');
fs = require('fs');


app.use(cors())

multer({
  limits: { fieldSize: 25 * 1024 * 1024 }
})

//PREVIEW

var previewStorage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'public/generatedP3nkd/img')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +file.originalname )
  }
})


var uploadPreview = multer({ storage: previewStorage }).single('file');


app.post('/uploadPreview',function(req, res) {
  console.log("Uploading preview...")

  uploadPreview(req, res, function (err) {
      if (err instanceof multer.MulterError) {
          return res.status(500).json(err)
      } else if (err) {
          console.log(err)
          return res.status(500).json(err)
      }
      console.log("P3nkD preview saved.")
      return res.status(200).send(req.file)
    })
});


//GLTF FILE

var fileStorage = multer.diskStorage({ 
  destination: function (req, file, cb) {
    cb(null, 'public/generatedP3nkd/files')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +file.originalname+'.glb')
  }
});

var uploadFile = multer({ storage: fileStorage }).single('file');

app.post('/uploadFile', function (req, res) {
  uploadFile(req, res, function (err) {
    if (err instanceof multer.MulterError) {
        return res.status(500).json(err)
    } else if (err) {
        console.log(err)
        return res.status(500).json(err)
    }
    console.log("P3nkD file saved.")
    return res.status(200).send(req.file)
  })
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
})

// var uploadFile = multer({ storage: fileStorage }).single('file');

// app.post('/uploadFile', async (req, res) => {
//   try {
//       if(!req.files) {
        
//           res.send({
//               status: false,
//               message: 'No file uploaded'
//           });
//       } else {
//           //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
//           let avatar = req.files;
//           console.log("sessssssssssssssssss")
//           console.log(avatar)
//           //Use the mv() method to place the file in upload directory (i.e. "uploads")
//           avatar.mv('public/generatedP3nkd/files');

//           //send response
//           res.send({
//               status: true,
//               message: 'File is uploaded',
//               data: {
//               }
//           });
//       }
//   } catch (err) {
//       res.status(500).send(err);
//   }
// });

// app.post('/uploadFile',function(req, res) {
//   console.log("Uploading file...")
//   uploadFile(req, res, function (err) {
//     if (err instanceof multer.MulterError) {
//         return res.status(500).json(err)
//     } else if (err) {
//         console.log(err)
//         return res.status(500).json(err)
//     }
//     console.log("P3nkD File uploaded.")
//     return res.status(200).send(req.file)
//   })
// });


app.listen(8000, function() {
    console.log('P3nkDUploader is running (localhost:8000) ...');
});