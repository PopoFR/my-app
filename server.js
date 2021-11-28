var express = require('express');
const multer = require('multer')
const cors = require('cors');
const fs = require('fs')
const app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '150mb'}));
app.use(bodyParser.urlencoded({limit: '150mb', extended: true}));

app.use(cors())

//JPG FILE
const jpgStorage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, './generatedP3nkd/img')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname )
  }
})

const uploadPreview = multer({storage: jpgStorage}).single('file');

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


//GLB FILE
const glbStorage = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, './generatedP3nkd/glb')
},
filename: function (req, file, cb) {
  cb(null, file.originalname )
}
})

const uploadGlb = multer({storage: glbStorage}).single('file');

app.post('/uploadGLB',function(req, res) {
  console.log("Uploading GLB...")

  uploadGlb(req, res, function (err) {

      if (err instanceof multer.MulterError) {
          return res.status(500).json(err)
      } else if (err) {
          console.log(err)
          return res.status(500).json(err)
      }
      console.log("P3nkD GLB saved.")
      return res.status(200).send(req.file)
    })
});


//GIF
const gifStorage = multer.diskStorage({ 
  destination: function (req, file, cb) {
    cb(null, './generatedP3nkd/gifs')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname )
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
    console.log("data")
    console.log(data)
    console.log("data")

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




function uploadAsync(req,res){
  return new Promise(function(resolve,reject){
       upload(req,res,function(err){
          if(err !== undefined) return reject(err);
          resolve();
       });
  });
}


 


app.listen(8000, function() {
    console.log('P3nkD Exporter is running...  (localhost:8000)');
});