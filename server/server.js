require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
//const multer = require('multer');
const PORT = process.env.PORT || 5000;
const upload=require('./middleware/multer')
const connectDB=require('./database/config')
const mongoose=require('mongoose');
const Applicant=require('./models/Applicant');
console.log(process.env.BACKEND_DOMAIN);

// Connect To MongDB
connectDB();

// Set up Multer storage

//const upload = multer({ dest: 'public/' });
// Middleware to serve static files
//app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const corsOptions = {
  origin: ['http://localhost:5173', process.env.ALLOWED_ORIGINS],
  credentials: true,
};
app.use(cors(corsOptions));
// Handle preflight requests
app.options('*', cors(corsOptions))

// Setting up GridFs bucket
let bucket;
mongoose.connection.on('connected', () => {
  bucket=new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName:'uploads',
  });
  console.log('GridFS Bucket initialized'); 
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGINS);
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

// Serve the React app
app.get('/', (req, res) => {
    res.send("Hello World");
});

// Recieve Application API
app.post('/api/apply', upload.array('document_files', 5), async (req, res) => {
  try {
    console.log('Files uploaded:', req.files);
    const { name, email, phone, service } = req.body;
    const fileNames = req.files.map(file => file.originalname).join(', ');
    const files=req.files.map(file => `${process.env.BACKEND_DOMAIN}/api/download/files/${file.id}`).join(' ');
    if(!name || !email || !phone || !service) {
      console.log('No form data provided');    
      return res.status(400).json({ error: 'No form data provided' });
    } else if (!req.files) {
      throw new Error();
    }
    await Applicant({
      name: name,
      email: email,
      phone: phone,
      service: service,
      documents: files
    }).save();
    res.status(200).json({ message: 'Form submitted successfully', data: email, Docs: fileNames, id: files });
  } catch(err) {
    console.error('Upload Error: ', err);
  }
})  

// Download files API
app.get('/api/download/files/:fileId', async (req, res) => {
  try {
    const {fileId}=req.params;
    // Check if files exist
    const file=await bucket.find({_id: new mongoose.Types.ObjectId(fileId)})
    if (file.length===0) {
      return res.status(404).json({error: { text:'File not found'}});
    }
    // set headers
    //res.set('Content-Type', file.contentType);
    //res.set('Content-Desposition', `attachment; filename=${file.filemame}`);
    // create a stream to read from the bucket
    const downloadStream=bucket.openDownloadStream(new mongoose.Types.ObjectId(fileId));
    // pipe the stream to the response
    downloadStream.pipe(res);
  } catch(err) {
    console.log(err);
    res.status(400).json({error: { text:'Unable to download file', err}});
  }
})


// Port configuration
/*
app.listen (PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});*/

// Export for Vercel
module.exports = app;



