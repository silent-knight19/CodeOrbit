import express from "express";
import userRouter from "./user.router.js";
import repoRouter from "./repo.router.js";
import issueRouter from "./issue.router.js";
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
    availableRoutes: {
      users: [
        'GET    /api/users/allUsers',
        'POST   /api/users/signup',
        'POST   /api/users/login',
        'GET    /api/users/allUsersProfile/:id',
        'PUT    /api/users/updateProfile/:id',
        'DELETE /api/users/deleteProfile/:id'
      ],
      repos: [
        'POST   /api/repo/create',
        'GET    /api/repo/all',
        'GET    /api/repo/id/:id',
        'GET    /api/repo/name/:name',
        'GET    /api/repo/user/:userId',
        'PUT    /api/repo/update/:id',
        'PATCH  /api/repo/togglevisibility/:id',
        'DELETE /api/repo/delete/:id'
      ],
      issues: [
        'POST   /api/issue/create',
        'GET    /api/issue/all',
        'GET    /api/issue/:id',
        'PUT    /api/issue/update/:id',
        'DELETE /api/issue/delete/:id'
      ]
    }
  });
});

export default router;
