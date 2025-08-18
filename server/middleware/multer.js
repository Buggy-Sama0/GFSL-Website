
const multer = require('multer');
const {GridFsStorage}=require('multer-gridfs-storage');
//const Grid=require('gridfs-stream');
const mongoose=require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
/*
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.originalname+'-'+uniqueSuffix);
  }
});*/

/*
conn.once('open', () => {
  gfs=Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
})*/

/*
var storage = new GridFsStorage({
  url: '',
  file: (req, file) => {
    console.log('Uploading file:', file); // Debug file object
    return new Promise((resolve, reject) => {
        const fileInfo = {
          filename: file.originalname,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
  },
});*/

const storage = new GridFsStorage({
  db: mongoose.connection,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const fileInfo = {
        filename: file.originalname,
        bucketName: 'uploads',
        metadata: {
          uploadedBy: req.body.email || 'anonymous',
          uploadDate: new Date()
        }
      };
      resolve(fileInfo);
    });
  }
});

const upload = multer({
  storage,
  limits: {
    files: 10,                       // max number of files
    fileSize: 200000 * 1024 * 1024,      // 200 MB per file (adjust as needed)
  },
});
module.exports=upload