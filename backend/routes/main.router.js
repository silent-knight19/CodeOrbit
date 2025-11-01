const express = require("express");
const userRouter = require("./user.router");
const repoRouter = require("./repo.router");
const router = express.Router();

router.use("/", userRouter);
router.use("/repo", repoRouter);

router.get("/test", (req, res) => {
  res.json({ message: "API is working" });
});

router.use((req, res) => {
  res.status(404).json({ message: `Cannot ${req.method} ${req.originalUrl}` });
});

module.exports = router;
