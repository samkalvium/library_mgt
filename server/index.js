const express = require("express");
const cors = require("cors");
const pool = require("./database"); 
const bookRoutes = require("./routes/bookRoutes"); // Book routes
const memberRoutes = require("./routes/memberRoutes"); // Member routes
const issuanceRoutes = require("./routes/issuanceRoutes"); // Issuance routes

const app = express();
app.use(cors());
app.use(express.json());

// Use the routes
app.use("/books", bookRoutes);
app.use("/members", memberRoutes);
app.use("/issuance", issuanceRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
