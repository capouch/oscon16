/*
 * routes.js - module to provide routing
 * Danilo Zekovic
 */

// Note that these are SERVER-SIDE routes
// --- Local variables
'use strict';
var
  configRoutes,

  // Multer handles MIME multi-part uploads
  multer = require('multer'),
  cb = require('cb'),
  storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
    },
  filename: function (req, file, cb) {
    cb(null, file.originalname + '-' + Date.now())
    }
  }),
  storage = multer( {storage: storage });

// --- End variable declarations

// --- Public API

configRoutes = function ( router, server ) {
  var options = {
    root: __dirname + '/../public'
   };

  router.get('/', function(req, res) {
    res.sendFile('index.html', options);
  });

  router.get('/home', function(req, res) {
    console.log('Server home chosen');
    res.sendFile('index.html', options);
  });

  router.get('/upload', function(req, res) {
    console.log('Server upload chosen');
    res.sendFile('index.html', options);
  });

  router.get('/browse', function(req, res) {
    console.log('Server browse chosen');
    res.sendFile('index.html', options);
  });

  router.get('/images', function(req, res) {
    console.log('Server browse chosen');
    res.sendFile('index.html', options);
  });

  router.get('/zoomer/*', function(req, res) {
    console.log('Server zoomer chosen');
    res.sendFile('index.html', options);
  });

  router.get('/login', function(req, res) {
    console.log('Server login chosen');
    res.sendFile('index.html', options);
  });

  // Fetch uploaded file handled by "storage" object in multer
  router.post('/uploadHandler', storage.single('file'), function(req, res) {
    console.log('Uploading file: ' + req.file.filename);
    let responseString = req.file.filename;
    if (req.body) {
        console.log(req.body);
    }
    res.send(JSON.stringify(responseString));
    //res.sendStatus(200);
  });
};

module.exports = { configRoutes : configRoutes };
