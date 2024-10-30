const mongoose = require('mongoose');

const uri = `${process.env.DB_CONNECTION_STRING}`;

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log(`MongoDB connected`);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
