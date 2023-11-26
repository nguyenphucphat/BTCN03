class Names {
    constructor(db) {
        this.db = db;
    }

    async createTable() {
        return this.db.none(`
            CREATE TABLE IF NOT EXISTS Names (
                id TEXT PRIMARY KEY,
                name TEXT,
                role TEXT,
                image TEXT,
                summary TEXT,
                birthDate TEXT,
                deathDate TEXT,
                height TEXT,
                awards TEXT,
                castMovies JSONB,
                images JSONB
            );
        `);
    }

    async insert(name) {
        return this.db.none(`
            INSERT INTO Names (id, name, role, image, summary, birthDate, deathDate, height, awards, castMovies, images) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
            ON CONFLICT (id) DO UPDATE SET
                name = EXCLUDED.name,
                role = EXCLUDED.role,
                image = EXCLUDED.image,
                summary = EXCLUDED.summary,
                birthDate = EXCLUDED.birthDate,
                deathDate = EXCLUDED.deathDate,
                height = EXCLUDED.height,
                awards = EXCLUDED.awards,
                castMovies = EXCLUDED.castMovies,
                images = EXCLUDED.images;
        `, [
            name.id, name.name, name.role, name.image, name.summary, name.birthDate, 
            name.deathDate, name.height, name.awards, JSON.stringify(name.castMovies), 
            JSON.stringify(name.images)
        ]);
    }

    getAllNames() {
        return this.db.any('SELECT * FROM Names;');
    }

    getNameById(id) {
        return this.db.oneOrNone('SELECT * FROM Names WHERE id = $1;', [id]);
    }
}

module.exports = Names;
