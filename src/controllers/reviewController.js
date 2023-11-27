const Reviews = require('../models/Review'); // Gọi lớp Movies từ file Movies.js
const db = require('../database/pgpInstance'); // Giả định đây là module kết nối cơ sở dữ liệu của bạn

const reviewModel = new Reviews(db);

exports.getReviewsByMovieId = async (req, res, next) => {
    const { movieId } = req.params;
    try {
        const reviews = await reviewModel.getReviewsByMovieId(movieId);
        if (reviews) {
            res.json(reviews);
        } else {
            res.status(404).send('No reviews found for this movie');
        }
    } catch (error) {
        next(new Error('Error fetching reviews: ' + error.message));
    }
};

// Bạn cũng có thể thêm các hàm controller khác ở đây để xử lý các yêu cầu khác liên quan đến Reviews
