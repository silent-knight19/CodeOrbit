const express = require("express");
const userRouter = require("./user.router");
const repoRouter = require("./repo.router");
const issueRouter= require("./issue.router");
const router = express.Router();

router.use("/", userRouter);
router.use("/repo", repoRouter);
router.use("/issue", issueRouter);

router.use((req, res) => {
  res.status(404).json({ message: `Cannot ${req.method} ${req.originalUrl}` });
});

module.exports = router;
