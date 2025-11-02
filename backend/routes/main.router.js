const express = require("express");
const userRouter = require("./user.router");
const repoRouter = require("./repo.router");
const issueRouter = require("./issue.router");
const router = express.Router();

// Debug middleware
router.use((req, res, next) => {
  console.log(`Main router - Incoming request: ${req.method} ${req.originalUrl}`);
  next();
});

// Mount routes
console.log("Mounting user routes at /users");
router.use("/users", userRouter);
router.use("/repo", repoRouter);
router.use("/issue", issueRouter);

// 404 handler for main router
router.use((req, res) => {
  console.log(`Main router - Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ 
    message: `Cannot ${req.method} ${req.originalUrl}`,
    availableRoutes: [
      'GET /api/users/allUsers',
      'POST /api/users/signup',
      'POST /api/users/login',
      'GET /api/users/allUsersProfile/:id',
      'PUT /api/users/updateProfile',
      'DELETE /api/users/deleteProfile'
    ]
  });
});

module.exports = router;
