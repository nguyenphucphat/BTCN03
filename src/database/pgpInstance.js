const pgp = require('pg-promise')();
require('dotenv').config();

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

// Tạo chuỗi kết nối
const connectionString = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`;

// Tạo đối tượng pg-promise
const db = pgp(connectionString);

module.exports = db;
