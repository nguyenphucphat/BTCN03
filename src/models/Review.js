class Reviews {
    constructor(db) {
        this.db = db;
    }

    async createTable() {
        return this.db.none(`
            CREATE TABLE IF NOT EXISTS Reviews (
                id SERIAL PRIMARY KEY,
                movieId TEXT UNIQUE,
                items JSONB
            );
        `);
    }

    async insert(review) {
        return this.db.none(`
            INSERT INTO Reviews (movieId, items) 
            VALUES ($1, $2)
            ON CONFLICT (movieId) DO UPDATE SET
                items = EXCLUDED.items;
        `, [review.movieId, JSON.stringify(review.items)]);
    }

    getAllReviews() {
        return this.db.any('SELECT * FROM Reviews;');
    }

    getReviewsByMovieId(movieId) {
        return this.db.oneOrNone('SELECT * FROM Reviews WHERE movieId = $1;', [movieId]);
    }
}

module.exports = Reviews;
