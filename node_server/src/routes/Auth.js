const express = require("express");
const { Auth } = require("../controllers");

const router = express.Router();

// To register user
router.post("/register", Auth.register)
// to authorize user
router.post("/login", Auth.login)

module.exports = router