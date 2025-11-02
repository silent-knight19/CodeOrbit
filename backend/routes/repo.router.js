const express = require("express");
const repoController = require("../controllers/repoController");

const repoRouter = express.Router();

// Create and list repos
repoRouter.post("/create", repoController.createRepo);
repoRouter.get("/all", repoController.getAllRepos);

// Get repos by different identifiers
repoRouter.get("/id/:id", repoController.fetchRepoById);
repoRouter.get("/name/:name", repoController.fetchRepoByName);
repoRouter.get("/user/:userId", repoController.fetchRepoForCurrentUser);

// Update and delete repos
repoRouter.put("/update/:id", repoController.updateRepobyId);
repoRouter.patch(
  "/togglevisibility/:id",
  repoController.togglevisibilityById
);
repoRouter.delete("/delete/:id", repoController.deleteRepobyId);
module.exports = repoRouter;

