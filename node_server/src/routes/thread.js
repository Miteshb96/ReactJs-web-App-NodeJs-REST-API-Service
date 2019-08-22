
const express = require("express");
const { Thread } = require("../controllers");

const router = express.Router();

// Get all threads
router.get("/getThread", Thread.getThread)
// Add new thread
router.post("/addThread", Thread.addThread)

module.exports = router

