const express = require("express");
const issueController = require("../controllers/issueController");
const issueRouter = express.Router();

// Create and list issues
issueRouter.post("/create", issueController.createIssue);
issueRouter.get("/all", issueController.getAllIssues);

// Get, update, and delete specific issues
issueRouter.get("/:id", issueController.getIssueById);
issueRouter.put("/update/:id", issueController.updateIssueById);
issueRouter.delete("/delete/:id", issueController.deleteIssueById);

module.exports = issueRouter;
