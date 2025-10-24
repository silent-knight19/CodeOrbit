const express = require("express");
const userRouter = require("./user.router");

const router = express.Router();

router.use("/", userRouter);

router.get("/test", (req, res) => {
  res.json({ message: "API is working" });
});

router.use((req, res) => {
  res.status(404).json({ message: `Cannot ${req.method} ${req.originalUrl}` });
});

module.exports = router;
