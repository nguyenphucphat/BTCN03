const fs = require("fs");
const db = require("./pgpInstance");

const Movies = require('../models/Movie');
const Names = require('../models/Name');
const Reviews = require('../models/Review');

const movies = new Movies(db);
const names = new Names(db);
const reviews = new Reviews(db);

let rawData = fs.readFileSync("./data/data.json");
let data = JSON.parse(rawData);

const dataInjections = async () => {
  // Xử lý cho Movies
  for (const movie of data.Movies) {
    try {
      await movies.insert(movie);
      // console.log(`Inserted movie: ${movie.title}`);
    } catch (error) {
      console.error(`Error inserting movie: ${error}`);
    }
  }
  // Xử lý cho Names
  for (const name of data.Names) {
    try {
      await names.insert(name);
      // console.log(`Inserted movie: ${movie.title}`);
    } catch (error) {
      console.error(`Error inserting name: ${error}`);
    }
  }

  // Xử lý cho Reviews
  for (const review of data.Reviews) {
    try {
      await reviews.insert(review);
      // console.log(`Inserted movie: ${movie.title}`);
    } catch (error) {
      console.error(`Error inserting review: ${error}`);
    }
  }
};

module.exports = dataInjections;
