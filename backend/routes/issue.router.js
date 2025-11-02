import express from "express";
import * as issueController from "../controllers/issueController.js";

const issueRouter = express.Router();

// Create and list issues
issueRouter.post("/create", issueController.createIssue);
issueRouter.get("/all", issueController.getAllIssues);

// Get, update, and delete specific issues
issueRouter.get("/:id", issueController.getIssueById);
issueRouter.put("/update/:id", issueController.updateIssueById);
issueRouter.delete("/delete/:id", issueController.deleteIssueById);

export default issueRouter;
