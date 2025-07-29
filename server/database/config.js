const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(
            'mongodb+srv://Limbuc324:Onepiecered0806@cluster0.rws3wyg.mongodb.net/gfsl_application_data?retryWrites=true&w=majority&appName=Cluster0'
        );
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return conn; // Return the connection
    } catch(err) {
        console.error('Error connecting to MongoDB: ', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;