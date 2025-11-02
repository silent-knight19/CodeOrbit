import mongoose from "mongoose";
import repos from "../models/repoModel.js";
import user from "../models/userModel.js";
import issue from "../models/issueModel.js";

async function createRepo(req, res) {
  const { userID, repoName, issues, contents, description, visibility } =
    req.body;
  try {
    if (!repoName) {
      return res.status(400).json({ message: "Repo name is required" });
    }
    if (!mongoose.Types.ObjectId.isValid(userID)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    const newRepo = new repos({
      name: repoName,
      user: userID,
      issues: issues,
      contents: contents,
      description: description,
      visibility: visibility,
    });
    const result = await newRepo.save();
    res
      .status(201)
      .json({ message: "Repo created successfully", repoID: result._id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getAllRepos(req, res) {
  res.send("All repos fetched successfully");
}

async function fetchRepoById(req, res) {
  res.send("Repo fetched successfully");
}

async function fetchRepoByName(req, res) {
  res.send("Repo fetched successfully");
}

async function fetchRepoForCurrentUser(req, res) {
  res.send("Repo fetched for logged in user successfully");
}

async function updateRepobyId(req, res) {
  res.send("Repo updated successfully");
}

async function togglevisibilityById(req, res) {
  res.send("Repo visibility toggled successfully");
}

async function deleteRepobyId(req, res) {
  res.send("Repo deleted successfully");
}

export {
  createRepo,
  getAllRepos,
  fetchRepoById,
  fetchRepoByName,
  fetchRepoForCurrentUser,
  updateRepobyId,
  togglevisibilityById,
  deleteRepobyId,
};
