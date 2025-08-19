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

// Connect To MongDB
connectDB();

let bucket;
mongoose.connection.on('connected', () => {
  bucket=new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName:'uploads',
  });
  console.log('GridFS Bucket initialized'); 
});



// middleware to check status 
/*
app.use((req, res, next) => {
  if (mongoose.connection.readyState!==1) {
    return res.status(500).json({
      error: 'Database initializing',
      status: 'Please try again in a few seconds'
    });
  }
  next();
})*/

// Set up Multer storage

//const upload = multer({ dest: 'public/' });
// Middleware to serve static files
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({ limit: '1000mb' }));
app.use(express.urlencoded({ limit: '1000mb', extended: true, parameterLimit:50000 }));
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

// Serve an interactive professional status dashboard
app.get('/', async (req, res) => {
  try {
    const ready = mongoose.connection.readyState === 1;
    let applicantCount = 0;
    try { applicantCount = await Applicant.countDocuments(); } catch (e) { /* ignore */ }

    const initial = {
      ready,
      applicantCount,
      uptime: process.uptime(),
      node: process.version,
      env: process.env.NODE_ENV || 'development',
      memory: process.memoryUsage(),
    };

    res.send(`
      <!doctype html>
      <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>GFSL — Backend Dashboard</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap');
          :root{--bg:#0b1220;--card:#071226;--accent:#06b6d4;--good:#10b981;--bad:#fb7185;--muted:#94a3b8}
          html,body{height:100%;margin:0;background:linear-gradient(180deg,#041226 0%,#071026 100%);font-family:Inter,system-ui,Segoe UI,Roboto,Arial;color:#e6eef6}
          .wrap{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:40px}
          .panel{width:100%;max-width:1000px;background:linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01));border-radius:14px;padding:28px;border:1px solid rgba(255,255,255,0.03);box-shadow:0 12px 40px rgba(2,6,23,0.6)}
          .header{display:flex;align-items:center;gap:16px}
          .logo{width:56px;height:56px;border-radius:12px;background:linear-gradient(135deg,var(--accent),#7c3aed);display:flex;align-items:center;justify-content:center;font-weight:700;box-shadow:0 8px 30px rgba(7,18,35,0.6)}
          .title{flex:1}
          h1{margin:0;font-size:20px}
          p.lead{margin:6px 0 0;color:var(--muted)}
          .grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:18px}
          .card{background:rgba(255,255,255,0.02);padding:14px;border-radius:10px;border:1px solid rgba(255,255,255,0.02)}
          .big{grid-column:span 2}
          .status-dot{display:inline-block;width:12px;height:12px;border-radius:50%;margin-right:8px;vertical-align:middle}
          .muted{color:var(--muted);font-size:13px}
          pre{background:transparent;color:#cfe7ff;white-space:pre-wrap;word-break:break-word;margin:0}
          .actions{display:flex;gap:8px}
          button{background:transparent;border:1px solid rgba(255,255,255,0.05);color:inherit;padding:8px 12px;border-radius:8px;cursor:pointer}
          .accent{border-color:rgba(6,182,212,0.12);box-shadow:0 6px 20px rgba(6,182,212,0.06)}
          .good{color:var(--good)}
          .bad{color:var(--bad)}
          .footer{margin-top:18px;display:flex;justify-content:space-between;align-items:center;color:var(--muted);font-size:13px}
        </style>
      </head>
      <body>
        <div class="wrap">
          <div class="panel">
            <div class="header">
              <div class="logo">GF</div>
              <div class="title">
                <h1>GFSL Backend — Live Dashboard</h1>
                <p class="lead">A real-time summary of service health, database connectivity, and application metrics.</p>
              </div>
              <div class="actions">
                <button id="refresh" class="accent">Refresh</button>
                <a href="/api/test-db" style="text-decoration:none"><button>DB Status</button></a>
              </div>
            </div>

            <div class="grid">
              <div class="card">
                <div class="muted">Node</div>
                <div style="margin-top:8px"><strong id="node">${initial.node}</strong></div>
                <div class="muted" style="margin-top:6px">Env: <span id="env">${initial.env}</span></div>
              </div>

              <div class="card">
                <div class="muted">Uptime</div>
                <div style="margin-top:8px"><strong id="uptime">${Math.floor(initial.uptime)}s</strong></div>
                <div class="muted" style="margin-top:6px">Auto-refreshes every 15s</div>
              </div>

              <div class="card">
                <div class="muted">Memory (RSS)</div>
                <div style="margin-top:8px"><strong id="mem">${Math.round(initial.memory.rss/1024/1024)} MB</strong></div>
                <div class="muted" style="margin-top:6px">Heap: <span id="heap">${Math.round(initial.memory.heapUsed/1024/1024)} MB</span></div>
              </div>

              <div class="card">
                <div class="muted">Applicants</div>
                <div style="margin-top:8px"><strong id="appCount">${initial.applicantCount}</strong></div>
                <div class="muted" style="margin-top:6px">Total documents stored in DB</div>
              </div>

              <div class="card big">
                <div style="display:flex;justify-content:space-between;align-items:center">
                  <div>
                    <div class="muted">Database</div>
                    <div style="margin-top:8px"><strong id="dbState">${initial.ready ? 'Connected' : 'Not connected'}</strong></div>
                    <div class="muted" style="margin-top:6px" id="dbMsg">${initial.ready ? 'Mongoose connection is open' : 'Mongoose not connected'}</div>
                  </div>
                  <div style="text-align:right">
                    <span id="dbDot" class="status-dot" style="background:${initial.ready ? 'var(--good)' : 'var(--bad)'}"></span>
                    <div class="muted" style="margin-top:8px">DB stats below</div>
                  </div>
                </div>
                <div style="margin-top:12px"><pre id="dbStats">${initial.ready ? 'loaded' : 'no stats'}</pre></div>
              </div>

              <div class="card">
                <div class="muted">Quick Links</div>
                <div style="margin-top:8px"><a href="/api/test-db" style="color:inherit">Interactive DB page</a></div>
                <div style="margin-top:8px"><a href="/api/test-db/json" style="color:inherit">/api/test-db/json</a></div>
              </div>
            </div>

            <div class="footer">
              <div>Powered by GFSL • <span id="host">${process.env.BACKEND_DOMAIN || 'local'}</span></div>
              <div>Updated: <span id="updated">${new Date().toLocaleString()}</span></div>
            </div>
          </div>
        </div>

        <script>
          const refreshBtn = document.getElementById('refresh');
          async function fetchInfo() {
            try {
              refreshBtn.disabled = true; refreshBtn.textContent = 'Refreshing...';
              const [a,b] = await Promise.all([
                fetch('/api/info').then(r => r.json()),
                fetch('/api/test-db/json').then(r => r.json())
              ]);

              if (a && a.uptime !== undefined) {
                document.getElementById('uptime').textContent = Math.floor(a.uptime) + 's';
                document.getElementById('node').textContent = a.node;
                document.getElementById('env').textContent = a.env;
                document.getElementById('mem').textContent = Math.round(a.memory.rss/1024/1024) + ' MB';
                document.getElementById('heap').textContent = Math.round(a.memory.heapUsed/1024/1024) + ' MB';
                document.getElementById('appCount').textContent = a.applicantCount;
              }

              if (b && b.ready !== undefined) {
                document.getElementById('dbState').textContent = b.ready ? 'Connected' : 'Not connected';
                document.getElementById('dbMsg').textContent = b.ready ? 'Mongoose connection is open' : 'Mongoose not connected';
                document.getElementById('dbDot').style.background = b.ready ? 'var(--good)' : 'var(--bad)';
                document.getElementById('dbStats').textContent = b.stats ? JSON.stringify(b.stats, null, 2) : 'No stats available';
              }
              document.getElementById('updated').textContent = new Date().toLocaleString();
            } catch (err) {
              console.error('Dashboard fetch error', err);
            } finally {
              refreshBtn.disabled = false; refreshBtn.textContent = 'Refresh';
            }
          }
          refreshBtn.addEventListener('click', fetchInfo);
          setInterval(fetchInfo, 15000);
        </script>
      </body>
      </html>
    `);
  } catch (err) {
    console.error('Root page render error:', err);
    res.status(500).send('<pre>Unable to render dashboard:\n'+err.message+'</pre>');
  }
});

// TEST DB - interactive status page
app.get('/api/test-db', async (req, res) => {
  try {
    const ready = mongoose.connection.readyState === 1;
    let stats = null;
    if (ready && mongoose.connection.db && typeof mongoose.connection.db.stats === 'function') {
      stats = await mongoose.connection.db.stats();
    }

    const initial = JSON.stringify({ ready, stats });

    res.send(`
      <!doctype html>
      <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>GFSL — DB Status</title>
        <style>
          :root{--bg:#0f1724;--card:#0b1220;--accent:#22c55e;--muted:#94a3b8}
          body{margin:0;font-family:Inter,system-ui,Segoe UI,Arial;background:linear-gradient(180deg,#071029 0%,#081727 100%);color:#e6eef6;display:flex;align-items:center;justify-content:center;height:100vh}
          .card{background:linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015));border:1px solid rgba(255,255,255,0.03);padding:28px;border-radius:12px;max-width:820px;width:94%;box-shadow:0 10px 30px rgba(2,6,23,0.6)}
          h1{margin:0 0 8px;font-size:20px}
          p.lead{margin:0 0 18px;color:var(--muted)}
          .status{display:flex;gap:16px;align-items:center}
          .badge{width:64px;height:64px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700}
          .ok{background:linear-gradient(90deg,#064e3b,#10b981);box-shadow:0 8px 24px rgba(16,185,129,0.12)}
          .bad{background:linear-gradient(90deg,#7f1d1d,#fb7185);box-shadow:0 8px 24px rgba(251,113,133,0.12)}
          .meta{flex:1}
          pre{background:rgba(255,255,255,0.02);padding:12px;border-radius:8px;overflow:auto;color:#cfe7ff;margin-top:12px}
          button{background:transparent;border:1px solid rgba(255,255,255,0.06);color:inherit;padding:8px 12px;border-radius:8px;cursor:pointer}
          .small{font-size:13px;color:var(--muted)}
          .pulse{animation:pulse 1.8s infinite}
          @keyframes pulse{0%{transform:scale(1)}50%{transform:scale(1.06)}100%{transform:scale(1)}}
        </style>
      </head>
      <body>
        <div class="card">
          <h1>GFSL — Database Status</h1>
          <p class="lead">A tiny dashboard to show whether the database is healthy — click "Refresh" to poll live stats.</p>

          <div class="status">
            <div class="badge ${ready ? 'ok pulse' : 'bad'}" id="badge">${ready ? '✓' : '✕'}</div>
            <div class="meta">
              <div><strong id="state">${ready ? 'Connected' : 'Not connected'}</strong> <span class="small" id="time">${new Date().toLocaleString()}</span></div>
              <div class="small" id="desc">${ready ? 'Mongoose reports the connection is open.' : 'Mongoose is not connected. The server will attempt reconnects in background.'}</div>
            </div>
            <div style="display:flex;flex-direction:column;gap:8px;align-items:flex-end">
              <button id="refresh">Refresh</button>
              <a href="/" style="text-decoration:none;color:inherit;text-align:right" class="small">Back to root</a>
            </div>
          </div>

          <div style="margin-top:18px">
            <div style="display:flex;gap:12px;align-items:center;justify-content:space-between">
              <strong>Live stats</strong>
              <span class="small">Fetched from MongoDB</span>
            </div>
            <pre id="stats">${stats ? JSON.stringify(stats, null, 2) : 'No stats available'}</pre>
          </div>
        </div>

        <script>
          const refreshBtn = document.getElementById('refresh');
          const badge = document.getElementById('badge');
          const state = document.getElementById('state');
          const desc = document.getElementById('desc');
          const statsEl = document.getElementById('stats');
          const timeEl = document.getElementById('time');

          async function fetchStats() {
            try {
              refreshBtn.disabled = true;
              refreshBtn.textContent = 'Checking...';
              const r = await fetch('/api/test-db/json');
              if (!r.ok) throw new Error('Network error');
              const payload = await r.json();
              const { ready, stats } = payload;
              badge.textContent = ready ? '✓' : '✕';
              badge.className = 'badge ' + (ready ? 'ok pulse' : 'bad');
              state.textContent = ready ? 'Connected' : 'Not connected';
              desc.textContent = ready ? 'Mongoose reports the connection is open.' : 'Mongoose is not connected. The server may still be initializing.';
              statsEl.textContent = stats ? JSON.stringify(stats, null, 2) : 'No stats available';
              timeEl.textContent = new Date().toLocaleString();
            } catch (err) {
              badge.textContent = '✕';
              badge.className = 'badge bad';
              state.textContent = 'Error';
              desc.textContent = err.message || 'Unable to fetch stats';
              statsEl.textContent = String(err);
            } finally {
              refreshBtn.disabled = false;
              refreshBtn.textContent = 'Refresh';
            }
          }

          refreshBtn.addEventListener('click', fetchStats);
          // auto-refresh every 20s while open
          setInterval(fetchStats, 20000);
        </script>
      </body>
      </html>
    `);
  } catch (err) {
    console.error('Test DB page error:', err);
    res.status(500).send(`<pre>Unable to render status page:\n${err.message}</pre>`);
  }
});

// JSON endpoint for programmatic checks / health checks
app.get('/api/test-db/json', async (req, res) => {
  try {
    const ready = mongoose.connection.readyState === 1;
    let stats = null;
    if (ready && mongoose.connection.db && typeof mongoose.connection.db.stats === 'function') {
      stats = await mongoose.connection.db.stats();
    }
    res.json({ success: true, ready, stats });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Recieve Application API
app.post('/api/apply', upload.array('document_files', 10), async (req, res) => {
  try {
    console.log('Files uploaded:', req.files?.length);
    const { name, email, phone, service } = req.body;
    const uploadedFiles = req.files || [];
    const fileNames = uploadedFiles.map(file => file.originalname).join(', ');
    const files = uploadedFiles.map(file => `${process.env.BACKEND_DOMAIN}/api/download/files/${file.id}`);

    if (!name || !email || !phone || !service) {
      console.log('No form data provided');
      return res.status(400).json({ error: 'No form data provided' });
    } else if (!req.files) {
      throw new Error();
    }
    await Applicant({
      name,
      email,
      phone,
      service,
      document_1: files[0] || null,
      document_2: files[1] || null,
      document_3: files[2] || null,
      document_4: files[3] || null,
      document_5: files[4] || null,
      document_6: files[5] || null,
      document_7: files[6] || null,
      document_8: files[7] || null,
    }).save();
    res.status(200).json({ message: 'Form submitted successfully', data: email, Docs: fileNames, id: files });
  } catch(err) {
    console.error('Upload Error: ', err);
  }
})  

// Globally handle multer errors so client sees reason
app.use((err, req, res, next) => {
  if (!err) return next();
  console.error('Global error handler:', err && err.message ? err.message : err);
  if (err && err.name === 'MulterError') {
    return res.status(400).json({ error: 'Upload error', code: err.code, message: err.message });
  }
  if (err && (err.type === 'entity.too.large' || err.status === 413 || err.message?.includes('too large'))) {
    return res.status(413).json({ error: 'Request entity too large', message: err.message });
  }
  return res.status(err.status || 500).json({ error: err.message || 'Server error' });
});

// Download files API
app.get('/api/download/files/:fileId', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      //throw new Error('Database not connected');
      await connectDB();
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

    /*
    downloadStream.on('error', (err) => {
      console.error('Download stream error:', err);
      if (!res.headersSent) {
        res.status(500).json({ error: 'File stream error' });
      }
    });*/
    // In your download endpoint
    //await Applicant.find()
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


// Server Listen
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Export the app for platforms that import it (Vercel) or for tests
module.exports = app;



