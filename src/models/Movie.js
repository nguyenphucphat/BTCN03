class Movies {
  constructor(db) {
    this.db = db;
  }

  // Tạo bảng Movies
  async createTable() {
    return this.db.none(`
          CREATE TABLE IF NOT EXISTS Movies (
              id TEXT PRIMARY KEY,
              title TEXT,
              originalTitle TEXT,
              fullTitle TEXT,
              year TEXT,
              image TEXT,
              releaseDate TEXT,
              runtimeStr TEXT,
              plot TEXT,
              awards TEXT,
              directorList TEXT[],
              writerList TEXT[],
              actorList JSONB,
              genreList TEXT[],
              companies TEXT,
              countries TEXT,
              languages TEXT,
              imDbRating TEXT,
              posters JSONB,
              images JSONB,
              boxOffice TEXT,
              plotFull TEXT,
              similars TEXT[]
          );
      `);
  }

  // Thêm dữ liệu vào bảng Movies
  async insert(movie) {
    return this.db.none(
      `
        INSERT INTO Movies (id, title, originalTitle, fullTitle, year, image, releaseDate, runtimeStr, plot, awards, directorList, writerList, actorList, genreList, companies, countries, languages, imDbRating, posters, images, boxOffice, plotFull, similars) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23)
        ON CONFLICT (id) DO UPDATE SET
            title = EXCLUDED.title,
            originalTitle = EXCLUDED.originalTitle,
            fullTitle = EXCLUDED.fullTitle,
            year = EXCLUDED.year,
            image = EXCLUDED.image,
            releaseDate = EXCLUDED.releaseDate,
            runtimeStr = EXCLUDED.runtimeStr,
            plot = EXCLUDED.plot,
            awards = EXCLUDED.awards,
            directorList = EXCLUDED.directorList,
            writerList = EXCLUDED.writerList,
            actorList = EXCLUDED.actorList,
            genreList = EXCLUDED.genreList,
            companies = EXCLUDED.companies,
            countries = EXCLUDED.countries,
            languages = EXCLUDED.languages,
            imDbRating = EXCLUDED.imDbRating,
            posters = EXCLUDED.posters,
            images = EXCLUDED.images,
            boxOffice = EXCLUDED.boxOffice,
            plotFull = EXCLUDED.plotFull,
            similars = EXCLUDED.similars;
    `,
      [
        movie.id,
        movie.title,
        movie.originalTitle,
        movie.fullTitle,
        movie.year,
        movie.image,
        movie.releaseDate,
        movie.runtimeStr,
        movie.plot,
        movie.awards,
        movie.directorList,
        movie.writerList,
        JSON.stringify(movie.actorList),
        movie.genreList,
        movie.companies,
        movie.countries,
        movie.languages,
        movie.imDbRating,
        JSON.stringify(movie.posters),
        JSON.stringify(movie.images),
        movie.boxOffice,
        movie.plotFull,
        movie.similars,
      ]
    );
  }

  // Lấy tổng số phim
  countMovies() {
    return this.db
      .one("SELECT COUNT(*) FROM Movies;")
      .then((result) => +result.count);
  }
  //
  getMoviesWithPage(per_page, page) {
    const offset = (page - 1) * per_page;
    return this.db.any("SELECT * FROM Movies LIMIT $1 OFFSET $2;", [
      per_page,
      offset,
    ]);
  }

  // Lấy tất cả phim
  getAllMovies() {
    return this.db.any("SELECT * FROM Movies;");
  }

  // Tìm kiếm phim theo tên hoặc thể loại
  searchMovies(searchTerm) {
    return this.db.any(
      `
          SELECT * FROM Movies
          WHERE title ILIKE $1 OR $1 = ANY(genreList);
      `,
      [`%${searchTerm}%`]
    );
  }

  // Lấy chi tiết của một phim cụ thể
  getMovieById(id) {
    return this.db.oneOrNone("SELECT * FROM Movies WHERE id = $1;", [id]);
  }

  // Các phương thức khác nếu cần
}

module.exports = Movies;
