const express = require('express');
const app = express();

// Cấu hình để phục vụ các file tĩnh từ thư mục public
app.use(express.static('public'));

// Phân tích cú pháp dữ liệu application/json
app.use(express.json());

// Phân tích cú pháp dữ liệu application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Thiết lập các routes
// Ví dụ: 
// const movieRoutes = require('./src/routes/movies');
// app.use('/movies', movieRoutes);

// Đối với các request không tìm thấy route phù hợp
app.use((req, res) => {
    res.status(404).send('Page not found');
});

// Khởi động server
module.exports = app;
