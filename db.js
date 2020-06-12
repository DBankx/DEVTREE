require('dotenv').config();
const mongoose = require('mongoose');
const DBURI = process.env.DBURI;

const connectToDB = async () => {
  try {
    await mongoose.connect(DBURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: true
    });

    console.log('Database connected');
  } catch (err) {
    console.log('Database connection failed');
    // exit the application
    process.exit(1);
  }
};

module.exports = connectToDB;
