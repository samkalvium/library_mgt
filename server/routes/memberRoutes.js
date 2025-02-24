// routes/memberRoutes.js
const express = require("express");
const router = express.Router();
const memberController = require("../controllers/memberController");

router.get("/", memberController.getAllMembers);        // GET all members
router.get("/:id", memberController.getMemberById);     // GET a single member by ID
router.post("/", memberController.createMember);         // POST a new member
router.put("/:id", memberController.updateMember);       // UPDATE a member by ID
router.delete("/:id", memberController.deleteMember);    // DELETE a member by ID

module.exports = router; // Export the router
