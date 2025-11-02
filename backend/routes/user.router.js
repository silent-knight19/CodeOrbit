const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

// Debug middleware
router.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.originalUrl}`);
  next();
});

router.get("/allUsers", userController.getAllUsers);
router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.get("/allUsersProfile/:id", userController.getUsersProfile);
router.put("/updateProfile/:id", userController.updateUserProfile);
router.delete("/deleteProfile/:id", userController.deleteUserProfile);

// Debug 404 for user routes
router.use((req, res) => {
  console.log(`User route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ message: `User route not found: ${req.method} ${req.originalUrl}` });
});

module.exports = router;
