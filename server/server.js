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

/*
let dbConnection;
const initializeDB=async () => {
  try {
    dbConnection=await connectDB();
    bucket=new mongoose.mongo.GridFSBucket(dbConnection.db, {
      bucketName:'uploads',
    });
    console.log('Database and GridFS ready');
  } catch (err) {
    console.error('Initialization failed:', err);
    setTimeout(initializeDB, 5000);
  }
}

initializeDB()
*/
let bucket;
mongoose.connection.on('connected', () => {
  bucket=new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName:'uploads',
  });
  console.log('GridFS Bucket initialized'); 
});

// Connect To MongDB
connectDB();

// middleware to check status
app.use((req, res, next) => {
  if (mongoose.connection.readyState!==1) {
    return res.status(500).json({
      error: 'Database initializing',
      status: 'Please try again in a few seconds'
    });
  }
  next();
})

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
//
app.use(cors(corsOptions));
// Handle preflight requests
app.options('*', cors(corsOptions))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGINS);
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

// Serve the React app
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>GFSL Backend</title>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          background-color: #f5f5f5;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
        }
        .container {
          text-align: center;
          padding: 2rem;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          max-width: 600px;
        }
        h1 {
          color: #2c3e50;
          margin-bottom: 1rem;
        }
        p {
          color: #7f8c8d;
          line-height: 1.6;
        }
        .status {
          display: inline-block;
          background: #2ecc71;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-weight: bold;
          margin-top: 1rem;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>GFSL Backend Service</h1>
        <p>This is the backend API for GFSL website. The API is running successfully.</p>
        <div class="status">Operational</div>
      </div>
    </body>
    </html>
  `);
});

// TEST DB
app.get('/api/test-db', async (req, res) => {
  try {
    const stats=await mongoose.connection.db.stats().ok;
    res.json({seccess: true, stats});
  } catch (err) {
    res.status(500).json({error: err.message});
  }
})

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
    if (mongoose.connection.readyState !== 1) {
      throw new Error('Database not connected');
    }
    // Verify Mongoose Connection
    /*
    if (mongoose.connection.readyState!==1) {
      throw new Error('Database not connected');
    }*/
    /*
    if(!bucket) {
      return res.status(500).json({error: 'Server not ready'});
    }*/
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

    downloadStream.on('error', (err) => {
      console.error('Download stream error:', err);
      if (!res.headersSent) {
        res.status(500).json({ error: 'File stream error' });
      }
    });
    // In your download endpoint
    await Applicant.find()
    // pipe the stream to the response
    downloadStream.pipe(res);
  } catch(err) {
    console.log(err);
    res.status(400).json({error: { text:'Unable to download file', details: err.message}});
  }
})

// Delete all files from the files collection
app.get('/api/deleteAllFile', async (req, res) => {
  try {
    const filesCollection = mongoose.connection.db.collection('uploads.files');
    const chunksCollection = mongoose.connection.db.collection('uploads.chunks');
    
    const deleteFilesResult = await filesCollection.deleteMany({});
    const deleteChunksResult = await chunksCollection.deleteMany({});

    res.status(200).json({
        success: true,
        message: "All files deleted successfully",
        stats: {
          filesDeleted: deleteFilesResult.deletedCount,
          chunksDeleted: deleteChunksResult.deletedCount
        }
      })

  } catch (err) {
    console.error("Delete all files error:", err);
    res.status(500).json({
      success: false,
      error: "Failed to delete files",
      details: err.message
    });
  }
})

// Port configuration
/*
app.listen (PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});*/

// Export for Vercel
module.exports = app;



