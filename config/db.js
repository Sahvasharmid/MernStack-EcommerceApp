import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
    console.log(`Connected to MongoDB at ${connect.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error}`);
  }
};

