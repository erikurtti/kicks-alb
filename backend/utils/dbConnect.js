import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI; // Ensure to use environment variables for sensitive data

let cachedClient = null;
let cachedDb = null;

export async function connectDB() {
    if (cachedDb) return cachedDb;

    if (!MONGODB_URI) {
        throw new Error('Please add your MongoDB URI to the environment variables');
    }

    try {
        cachedClient = await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        cachedDb = cachedClient.connection;
        console.log('DB Connected');
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
        throw new Error('Error connecting to MongoDB');
    }

    return cachedDb;
}
