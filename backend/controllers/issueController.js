import mongoose from "mongoose";
import Repository from "../models/repoModel.js";
import Issue from "../models/issuemodel.js";

// Create a new issue for a repository
export const createIssue = async (req, res) => {
  const { title, description } = req.body;
  const { id: repositoryId } = req.params;

  try {
    // Check if repository exists
    const repository = await Repository.findById(repositoryId);
    if (!repository) {
      return res.status(404).json({ 
        success: false,
        message: 'Repository not found' 
      });
    }

    const issue = new Issue({
      title,
      description,
      repository: repositoryId,
      status: 'Open' // Default status
    });

    await issue.save();
    res.status(201).json({
      success: true,
      data: issue
    });
  } catch (error) {
    console.error('Error creating issue:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create issue',
      error: error.message
    });
  }
};

// Get all issues for a repository
export const getAllIssues = async (req, res) => {
  const { id: repositoryId } = req.params;

  try {
    const issues = await Issue.find({ repository: repositoryId });
    res.status(200).json({
      success: true,
      count: issues.length,
      data: issues
    });
  } catch (error) {
    console.error('Error fetching issues:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch issues',
      error: error.message
    });
  }
};

// Get a single issue by ID
export const getIssueById = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) {
      return res.status(404).json({
        success: false,
        message: 'Issue not found'
      });
    }
    res.status(200).json({
      success: true,
      data: issue
    });
  } catch (error) {
    console.error('Error fetching issue:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch issue',
      error: error.message
    });
  }
};

// Update an issue by ID
export const updateIssueById = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const updateData = {};
    
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (status) {
      if (!['Open', 'Closed'].includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Status must be either 'Open' or 'Closed'"
        });
      }
      updateData.status = status;
    }

    const updatedIssue = await Issue.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedIssue) {
      return res.status(404).json({
        success: false,
        message: 'Issue not found'
      });
    }

    res.status(200).json({
      success: true,
      data: updatedIssue
    });
  } catch (error) {
    console.error('Error updating issue:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update issue',
      error: error.message
    });
  }
};

// Delete an issue by ID
export const deleteIssueById = async (req, res) => {
  try {
    const deletedIssue = await Issue.findByIdAndDelete(req.params.id);
    
    if (!deletedIssue) {
      return res.status(404).json({
        success: false,
        message: 'Issue not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Issue deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting issue:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete issue',
      error: error.message
    });
  }
};