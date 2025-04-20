// File: config/database.js
const mongoose = require('mongoose');

// Replace with your actual MongoDB URI in production
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/campus-lms';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // These options might be needed depending on your MongoDB version
  // useCreateIndex: true,
  // useFindAndModify: false
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// For future replacement with node.sql.connect
const setupSqlConnection = () => {
  // This function will be implemented later when switching to SQL
  console.log('SQL connection placeholder - to be implemented');
  
  // Example SQL setup (commented out for now)
  /*
  const sql = require('mssql');
  
  const config = {
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    server: process.env.SQL_SERVER,
    database: process.env.SQL_DATABASE,
    options: {
      encrypt: true,
      trustServerCertificate: true
    }
  };
  
  return sql.connect(config);
  */
};

module.exports = {
  mongoose,
  setupSqlConnection
};