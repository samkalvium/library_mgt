// routes/issuanceRoutes.js
const express = require("express");
const router = express.Router();
const issuanceController = require("../controllers/issuanceController");

router.get("/", issuanceController.getAllIssuances);        // GET all issuances
router.get("/:id", issuanceController.getIssuanceById);     // GET a single issuance by ID


module.exports = router; // Export the router
