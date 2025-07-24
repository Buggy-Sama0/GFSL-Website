const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
//const multer = require('multer');
const PORT = process.env.PORT || 5000;
const upload=require('./middleware/multer')

// Set up Multer storage

//const upload = multer({ dest: 'public/' });
// Middleware to serve static files
//app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};
app.use(cors(corsOptions));
// Serve the React app

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.post('/api/apply', upload.array('document_files', 5), async (req, res) => {
    console.log('Files uploaded:', req.files);
    const { name, email, phone, service } = req.body;
    const fileNames = req.files.map(file => file.originalname).join(', ');
    if(!name || !email || !phone || !service) {
        console.log('No form data provided');    
        return res.status(400).json({ error: 'No form data provided' });
    }
    res.status(200).json({ message: 'Form submitted successfully', data: email, Docs: fileNames });
})  

// Port configuration
app.listen (PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


