const express = require("express");
const repoController = require("../controllers/repoController");

const repoRouter = express.Router();

repoRouter.post("/repo/create", repoController.createRepo);
repoRouter.get("/repo/all", repoController.getAllRepos);
repoRouter.get("/repo/:id", repoController.fetchRepoById);
repoRouter.get("/repo/:name", repoController.fetchRepoByName);
repoRouter.get("/repo/:userId", repoController.fetchRepoForCurrentUser);
repoRouter.put("/repo/update/:id", repoController.updateRepobyId);
repoRouter.patch(
  "/repo/togglevisibility/:id",
  repoController.togglevisibilityById
);
repoRouter.delete("/repo/delete/:id", repoController.deleteRepobyId);
module.exports = repoRouter;

