const pool = require("../database");

// GET all books
exports.getAllBooks = async (req, res) => {
    try {
        const response = await pool.query("SELECT * FROM Book");
        res.json(response.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// GET a single book by ID
exports.getBookById = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await pool.query("SELECT * FROM Book WHERE id = $1", [id]);
        res.json(response.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// POST a new book
exports.createBook = async (req, res) => {
    try {
        const { title, author, published_year } = req.body;
        const response = await pool.query(
            "INSERT INTO Book (title, author, published_year) VALUES ($1, $2, $3) RETURNING *",
            [title, author, published_year]
        );
        res.status(201).json(response.rows[0]);
    } catch (err) {
        console.error("Error details:", err); 
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// UPDATE a book by ID
exports.updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, author, published_year } = req.body;
        const response = await pool.query(
            "UPDATE Book SET title = $1, author = $2, published_year = $3 WHERE id = $4 RETURNING *",
            [title, author, published_year, id]
        );
        res.json(response.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// DELETE a book by ID
exports.deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await pool.query("DELETE FROM Book WHERE id = $1 RETURNING *", [id]);
        if (response.rowCount === 0) {
            return res.status(404).json({ error: "Book not found" });
        }
        res.json({ message: "Book deleted successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
