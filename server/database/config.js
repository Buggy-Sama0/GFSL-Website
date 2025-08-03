require('dotenv').config();
const mongoose = require('mongoose');
//let bucket;
let connection;
const connectDB = async () => {
    try {
        connection = await mongoose.createConnection( process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 0, // Never timeout
            keepAlive: true,
            keepAliveInitialDelay: 300000, // 5 minutes
            maxPoolSize: 10,
            minPoolSize: 2, // Maintain minimum connections
            heartbeatFrequencyMS: 10000, // 10 second heartbeats
            retryWrites: true,
            retryReads: true,
            connectTimeoutMS: 30000
        });
        //Initialize GridFs Bucket after connection
        /*
        bucket=new mongoose.mongo.GridFSBucket(conn.connection.db, {
            bucketName:'uploads'
        })*/

        connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
            connection = null;
        });

        connection.on('disconnected', () => {
            console.log('MongoDB disconnected - reconnecting');
            connection = null;
            setTimeout(connectDB, 1000);
        });
        console.log(`MongoDB Connected ${conn.connection.host}`);
        return connection; // Return the connection
    } catch(err) {
        console.error('Error connecting to MongoDB: ', err.message);
        setTimeout(connectDB, 5000);
    }
};
/*
// Connection event handlers
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to DB');
})

// Event listeners for connection issues
mongoose.connection.on('disconnected', () => {
    console.log('MingoDB disconnected');
    connectDB(); // Auto-reconnect
});*/

// Keep-alive ping
setInterval(async () => {
  if (connection?.readyState === 1) {
    try {
      await connection.db.admin().ping();
    } catch (err) {
      console.error('Keep-alive ping failed:', err);
      connection = null;
    }
  }
}, 300000); // 5 minutes

module.exports = {connectDB, getConnection: () => connection};