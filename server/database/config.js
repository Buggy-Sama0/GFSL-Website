require('dotenv').config();
const mongoose = require('mongoose');
//let bucket;
const connectDB = async () => {
    try {
        const conn = await mongoose.connect( process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 30000, // 30 seconds
            socketTimeoutMS: 0, // 0 seconds
            maxPoolSize: 10,
            retryWrites: true,
            retryReads: true
            
        });
        //Initialize GridFs Bucket after connection
        /*
        bucket=new mongoose.mongo.GridFSBucket(conn.connection.db, {
            bucketName:'uploads'
        })*/
        console.log(`MongoDB Connected ${conn.connection.host}`);
        // return conn; // Return the connection
    } catch(err) {
        console.error('Error connecting to MongoDB: ', err.message);
        setTimeout(connectDB, 5000);
    }
};

// Connection event handlers
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to DB');
})

// Event listeners for connection issues
mongoose.connection.on('disconnected', () => {
    console.log('MingoDB disconnected');
    connectDB(); // Auto-reconnect
});

module.exports = connectDB;