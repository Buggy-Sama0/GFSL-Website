require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        const connection = await mongoose.connect( process.env.MONGODB_URI, {
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
        /*
        connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
            connection = null;
        });

        connection.on('disconnected', () => {
            console.log('MongoDB disconnected - reconnecting');
            setTimeout(connectDB, 1000);
        });*/

        console.log(`MongoDB Connected ${connection.connection.host}`);
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

module.exports = connectDB;