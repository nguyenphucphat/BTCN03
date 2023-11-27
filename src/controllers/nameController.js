const Names = require('../models/Name'); // Gọi lớp Movies từ file Movies.js
const db = require('../database/pgpInstance'); // Giả định đây là module kết nối cơ sở dữ liệu của bạn

const nameModel = new Names(db);

exports.getNameById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const name = await nameModel.getNameById(id);
        if (name) {
            res.json(name);
        } else {
            res.status(404).send('Name not found');
        }
    } catch (error) {
        next(new Error('Error fetching name: ' + error.message));
    }
};

// Bạn cũng có thể thêm các hàm controller khác ở đây để xử lý các yêu cầu khác liên quan đến Names
