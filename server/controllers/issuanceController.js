// controllers/issuanceController.js
const pool = require("../database");

// GET all issuances
exports.getAllIssuances = async (req, res) => {
    try {
        const response = await pool.query("SELECT * FROM Issuance");
        res.json(response.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// GET a single issuance by ID
exports.getIssuanceById = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await pool.query("SELECT * FROM Issuance WHERE id = $1", [id]);
        res.json(response.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};