import express from "express";
import * as repoController from "../controllers/repoController.js";

const repoRouter = express.Router();

// Create and list repos
repoRouter.post("/create", repoController.createRepo);
repoRouter.get("/all", repoController.getAllRepos);

// Get repos by different identifiers
repoRouter.get("/id/:id", repoController.fetchRepoById);
repoRouter.get("/name/:name", repoController.fetchRepoByName);

// Debug route
repoRouter.get("/user/:userId", (req, res, next) => {
  console.log(`GET /repo/user/${req.params.userId} - Request received`);
  next();
}, repoController.fetchRepoForCurrentUser);

// Update and delete repos
repoRouter.put("/update/:id", repoController.updateRepobyId);
repoRouter.patch(
  "/togglevisibility/:id",
  repoController.togglevisibilityById
);
repoRouter.delete("/delete/:id", repoController.deleteRepobyId);
export default repoRouter;

