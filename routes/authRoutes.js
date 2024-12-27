const express = require("express");
const { register, loginUser } = require("../controller/authController");

const router = express.Router();

// Register route
router.post("/register", register);

// Login route
router.post("/login", loginUser);

module.exports = router;
