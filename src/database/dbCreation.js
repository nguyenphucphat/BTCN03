// databaseCreation.js
const { Pool } = require('pg');
require("dotenv").config();

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

const createDatabase = async () => {
  const pool = new Pool({
    user: DB_USER,
    host: DB_HOST,
    password: DB_PASSWORD,
    port: DB_PORT,
    database: 'postgres' // Kết nối tới default database để tạo mới
  });

  try {
    // Sử dụng một client riêng biệt từ pool để kiểm tra kết nối
    const client = await pool.connect();

    await client.query(`CREATE DATABASE "${DB_NAME}"`);
    console.log(`Database ${DB_NAME} created successfully.`);
    client.release(); // Giải phóng client sau khi sử dụng
    return true;
  } catch (error) {
    if (error.code === '42P04') {
      console.log(`Database ${DB_NAME} already exists.`);
      return false;
    } else {
      console.error('Error while creating the database:', error);
      return false;
    }
  } finally {
    setTimeout(async () => {
      await pool.end();
     
    }, 800); // Đợi 1 giây trước khi đóng pool
  }
};

module.exports = createDatabase;
