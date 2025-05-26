const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongod = null;

const connectDB = async () => {
  try {
    // Check if we should use local MongoDB or in-memory server
    if (process.env.MONGO_URI.includes('localhost') || process.env.MONGO_URI.includes('127.0.0.1')) {
      try {
        // Try connecting to local MongoDB first
        await mongoose.connect(process.env.MONGO_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected: ${mongoose.connection.host}`);
      } catch (localError) {
        console.log(`Could not connect to local MongoDB: ${localError.message}`);
        console.log('Starting in-memory MongoDB server instead...');
        
        // Start in-memory MongoDB server as fallback
        mongod = await MongoMemoryServer.create();
        const uri = mongod.getUri();
        
        await mongoose.connect(uri, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        
        console.log(`In-Memory MongoDB Server Running at: ${mongoose.connection.host}`);
      }
    } else {
      // Connect to remote MongoDB (Atlas, etc.)
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log(`MongoDB Connected: ${mongoose.connection.host}`);
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
