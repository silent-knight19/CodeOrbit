import mongoose from "mongoose";
import repos from "../models/repoModel.js";
import user from "../models/userModel.js";
import issue from "../models/issueModel.js";

async function createRepo(req, res) {
  const { name, owner, description, content, visibility, issues = [] } = req.body;
  try {
    if (!name) {
      return res.status(400).json({ message: "Repo name is required" });
    }
    if (!mongoose.Types.ObjectId.isValid(owner)) {
      return res.status(400).json({ message: "Invalid owner ID" });
    }
    const newRepo = new repos({
      name,
      owner,
      description,
      content,
      visibility: visibility !== undefined ? visibility : true,
      issues
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
  try {
    const allRepos = await repos.find({}).populate("owner").populate("issues");
    res.status(200).json(allRepos);
  } catch (error) {
    console.error("Error in getAllRepos:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching repositories",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal server error",
    });
  }
}

async function fetchRepoById(req, res) {
  const { repoID } = req.params;
  try {
    const repo = await repos
      .findById({ _id: repoID })
      .populate("owner")
      .populate("issues")
      .toArray();
    res.status(200).json(repo);
  } catch (error) {
    console.error("Error in fetchRepoById:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching repository",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal server error",
    });
  }
}

async function fetchRepoByName(req, res) {
  const { repoName } = req.params;
  try {
    const repo = await repos
      .findOne({ repoName })
      .populate("owner")
      .populate("issues")
      .toArray();
    res.status(200).json(repo);
  } catch (error) {
    console.error("Error in fetchRepoByName:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching repository",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal server error",
    });
  }
}

async function fetchRepoForCurrentUser(req, res) {
  const userId = req.params.userId;
  console.log(`Fetching repositories for user ID: ${userId}`);
  
  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      console.error(`Invalid user ID format: ${userId}`);
      return res.status(400).json({ 
        success: false,
        message: "Invalid user ID format" 
      });
    }
    
    const message1 = `Searching for repos with owner: ${userId}`;
    console.log(message1);

    const reposList = await repos.find({ owner: userId });
    
    const message2 = `Found ${reposList.length} repositories for user ${userId}`;
    console.log(message2);
    
    return res.status(200).json({
      success: true,
      count: reposList.length,
      data: reposList,
      logs: [message1, message2]  // Including console messages in response
    });
    
  } catch (error) {
    console.error("Error in fetchRepoForCurrentUser:", error);
    res.status(500).json({ 
      success: false,
      message: "Error fetching repositories",
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}

async function updateRepobyId(req, res) {
const{repoID}=req.params;
const{content,description}=req.body;
try{
    const repo=await repos.findById({repoID});
    if(!repo){
        return res.status(404).send("Repository not found");
    }
    repo.content.push(content);
    repo.description=description;
   const updatedRepo= await repo.save();
    res.status(200).json({message:"Repository updated successfully",updatedRepo});
}
catch(error){
    console.log("error during updating repository",error);
    res.status(500).json({message:"error during updating repo",error:error.message});
}
}

async function togglevisibilityById(req, res) {
const{repoID}=req.params;
try{
    const repo=await repos.findById({repoID});
    if(!repo){
        return res.status(404).send("Repository not found");
    }
    repo.visibility=!repo.visibility;
   const updatedRepo= await repo.save();
    res.status(200).json({message:"Repository visibility toggled successfully",updatedRepo});
}
catch(error){
    console.log("error during toggling visibility of repository",error);
    res.status(500).json({message:"error during toggling visibility of repo",error:error.message});
}
}

async function deleteRepobyId(req, res) {
const{repoID}=req.params;
try{
    const repo=await repos.findByIdAndDelete(repoID);
    if(!repo){
        return res.status(404).json({message:"Repository not found"});
    }
    res.status(200).json({message:"Repository deleted successfully",repo});
}
catch(error){
    console.log("error during deleting repository",error);
    res.status(500).json({message:"error during deleting repo",error:error.message});
}
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
