import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect('enter_your_mongodb_url_here' || '');
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    process.exit(1);
  }
};
