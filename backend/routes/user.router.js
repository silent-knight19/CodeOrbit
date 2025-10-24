const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();


router.get("/allUsers", userController.getAllUsers);
router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.get("/allUsersProfile", userController.getAllUsersProfile);
router.put("/updateProfile", userController.updateUserProfile);
router.delete("/deleteProfile", userController.deleteUserProfile);

module.exports = router;
