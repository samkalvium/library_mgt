// controllers/memberController.js
const pool = require("../database"); // Adjust the path to your database module

// GET all members
const getAllMembers = async (req, res) => {
    try {
        const response = await pool.query("SELECT * FROM member");
        res.json(response.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// GET a single member by ID
const getMemberById = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await pool.query("SELECT * FROM member WHERE id = $1", [id]);
        if (response.rows.length === 0) {
            return res.status(404).json({ error: "Member not found" });
        }
        res.json(response.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// POST a new member
const createMember = async (req, res) => {
    try {
        const { name } = req.body;
        const response = await pool.query(
            "INSERT INTO member (name) VALUES ($1) RETURNING *",
            [name]
        );
        res.status(201).json(response.rows[0]);
    } catch (err) {
        console.error("Error details:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// UPDATE a member by ID
const updateMember = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const response = await pool.query(
            "UPDATE member SET name = $1 WHERE id = $2 RETURNING *",
            [name, id]
        );
        if (response.rows.length === 0) {
            return res.status(404).json({ error: "Member not found" });
        }
        res.json(response.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// DELETE a member by ID
const deleteMember = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await pool.query("DELETE FROM member WHERE id = $1 RETURNING *", [id]);
        if (response.rowCount === 0) {
            return res.status(404).json({ error: "Member not found" });
        }
        res.json({ message: "Member deleted successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Export the controller functions
module.exports = {
    getAllMembers,
    getMemberById,
    createMember,
    updateMember,
    deleteMember,
};
