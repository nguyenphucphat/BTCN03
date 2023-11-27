const Movies = require('../models/Movie'); // Gọi lớp Movies từ file Movies.js
const db = require('../database/pgpInstance'); // Giả định đây là module kết nối cơ sở dữ liệu của bạn

const movieModel = new Movies(db);


exports.insertMovie = async (req, res, next) => {
    try {
        await movieModel.insert(req.body); // Giả định dữ liệu phim được gửi qua req.body
        res.send('Movie inserted successfully');
    } catch (error) {
        next(new Error('Error inserting movie: ' + error.message));
    }
};

// exports.getAllMovies = async (req, res, next) => {
//     try {
//         const movies = await movieModel.getAllMovies();
//         res.json(movies);
//     } catch (error) {
//         next(new Error('Error fetching movies: ' + error.message));
//     }
// };

exports.getAllMovies = async (req, res,next) => {
    const { per_page = 6, page = 1 } = req.query;

    try {
        const movies = await movieModel.getMoviesWithPage(per_page, page);
        // Tính toán tổng số trang và thông tin phân trang khác
        const total = await movieModel.countMovies();

        // Render trang sử dụng template engine
        res.render("layout", {
            pageType: 'listMovie',
            movies, // Dữ liệu phim
            currentPage: page,
            totalPages: Math.ceil(total / per_page)
            // Thêm các thông tin phân trang khác
        });

        // res.send("<a>hello</a>");
    } catch (error) {
        console.error(error);
        next(error);
    }
};


exports.searchMovies = async (req, res, next) => {
    const { searchTerm } = req.query;
    try {
        const movies = await movieModel.searchMovies(searchTerm);
        res.json(movies);
    } catch (error) {
        next(new Error('Error searching movies: ' + error.message));
    }
};

exports.getMovieById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const movie = await movieModel.getMovieById(id);
        if (movie) {
            res.json(movie);
        } else {
            const error = new Error('Movie not found');
            error.status = 404;
            throw error;
        }
    } catch (error) {
        next(error);
    }
};
