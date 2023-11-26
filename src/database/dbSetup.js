const db = require('./pgpInstance');

const Movies = require('../models/Movie');
const Names = require('../models/Name');
const Reviews = require('../models/Review');

const setupDatabase = async () => {
  try {
    // Tạo các thể hiện của models
    const movies = new Movies(db);
    const names = new Names(db);
    const reviews = new Reviews(db);

    // Tạo các bảng
    await movies.createTable();
    console.log('Movies table created successfully.');
    
    await names.createTable();
    console.log('Names table created successfully.');

    await reviews.createTable();
    console.log('Reviews table created successfully.');
  } catch (error) {
    console.error('Unable to setup the database:', error);
    throw error;
  }
};

module.exports = setupDatabase;
