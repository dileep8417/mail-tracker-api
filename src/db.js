const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const db_uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mailTracker';
        await mongoose.connect(db_uri);
        console.log('Database connected');
    } catch (e) {
        console.log(e.message);
    }
}

module.exports = connectDB;