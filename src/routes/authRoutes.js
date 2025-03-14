const express = require("express");
const router = express.Router();

const authController = require("../controller/authController");


const { validateSignup, validateLogin } = require("../validations/userValidation");

// Authentication Routes
router.post("/signup", validateSignup, authController.register);
router.post("/login", validateLogin, authController.login);

module.exports = router;
