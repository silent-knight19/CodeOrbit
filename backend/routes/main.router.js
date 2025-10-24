const express = require("express");
const userRouter = require("./user.router");

const router = express.Router();

// Mount user routes
router.use("/", userRouter);

// Test route
router.get("/test", (req, res) => {
  res.json({ message: "API is working" });
});

// 404 handler for /api/*
router.use((req, res) => {
  res.status(404).json({ message: `Cannot ${req.method} ${req.originalUrl}` });
});

module.exports = router;
