require('dotenv').config();
const mongoose = require('mongoose');
//let bucket;
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(
            process.env.MONGODB_URI
        );

        //Initialize GridFs Bucket after connection
        /*
        bucket=new mongoose.mongo.GridFSBucket(conn.connection.db, {
            bucketName:'uploads'
        })*/

        console.log(`MongoDB Connected and GridFS Bucket initialized: ${conn.connection.host}`);
        return conn; // Return the connection
    } catch(err) {
        console.error('Error connecting to MongoDB: ', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;