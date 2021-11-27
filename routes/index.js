var express = require('express');
const multer = require('multer');
var router = express.Router();

var imgs = null;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

const upload = multer();
router.post('/upload', upload.single("file"), async function(req,res, next) {
  imgs = req.file;
  // console.log(req.file);

  // Imports the Google Cloud client library
  const vision = require('@google-cloud/vision');

  // Creates a client
  const client = new vision.ImageAnnotatorClient();

  // Performs label detection on the image file
  const [result] = await client.textDetection(imgs.path);
  const labels = result.textAnnotations;
  
  console.log('Labels:');
  console.log(labels[0].description)
  res.send(labels[0].description)
})



  


module.exports = router;
