const express = require('express');
const multer = require('multer')
const cors = require('cors');
const fs = require('fs')
const app = express();

app.use(cors())


//JPG FILE
const previewStorage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, './generatedP3nkd/img')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +file.originalname )
  }
})

const uploadPreview = multer({storage: previewStorage}).single('file');

app.post('/uploadJPG',function(req, res) {
  console.log("Uploading JPG...")

  uploadPreview(req, res, function (err) {
      if (err instanceof multer.MulterError) {
          return res.status(500).json(err)
      } else if (err) {
          console.log(err)
          return res.status(500).json(err)
      }
      console.log("P3nkD JPG saved.")
      return res.status(200).send(req.file)
    })
});

//GLTF FILE
const fileStorage = multer.diskStorage({ 
  destination: function (req, file, cb) {
    cb(null, './generatedP3nkd/files')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +file.originalname )
  }
});

const uploadFile = multer({storage: fileStorage}).single('file');

app.post('/uploadGLB', function (req, res) {
  console.log("Uploading GLB...")

  uploadFile(req, res, function (err) {
    if (err instanceof multer.MulterError) {
        return res.status(500).json(err)
    } else if (err) {
        console.log(err)
        return res.status(500).json(err)
    }
    console.log("P3nkD GLB saved.")
    return res.status(200).send(req.file)
  })
})


//GIF
const gifStorage = multer.diskStorage({ 
  destination: function (req, file, cb) {
    cb(null, './generatedP3nkd/gifs')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +file.originalname )
  }
});

const uploadGif = multer({storage: gifStorage}).single('file');

app.post('/uploadGIF', function (req, res) {
  console.log("Uploading GIF...")

  uploadGif(req, res, function (err) {
    if (err instanceof multer.MulterError) {
        return res.status(500).json(err)
    } else if (err) {
        console.log(err)
        return res.status(500).json(err)
    }
    console.log("P3nkD GIF saved.")
    return res.status(200).send(req.file)
  })
})


app.post('/updateJson', function (req, res) {
  
  console.log("Updating Json...")

  var currentSearchResult = '55555555'

  fs.readFile('./generatedP3nkd/punks.json', function (err, data) {
    console.log("reading")
    if (err)
      console.log(err)

      var json = JSON.parse(data)
      console.log(json)
      json.push('search result: ' + currentSearchResult)

      fs.writeFile('./generatedP3nkd/punks.json', JSON.stringify(json), 
        function(errA) {
          if(errA) {
               console.log(errA);
          }
          console.log("The file was saved!");
      }); 
  })

})


var list = ["test", "rrr"];

app.get('/getListGeneratedPunk', (req, res) => {
  res.send(list)
});

app.listen(8000, function() {
    console.log('P3nkD Exporter is running...  (localhost:8000)');
});