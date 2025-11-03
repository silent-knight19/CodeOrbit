const mongoose = require("mongoose");
const repoModel = require("../models/repoModel");
const issueModel = require("../models/issueModel");
const userModel = require("../models/userModel");

async function createIssue(req, res) {
  const { title, description } = req.body;
  const { userID } = req.params;
  try {
    const issue = new issue({
      title,
      description,
      repository: userID,
    });
    await issue.save();
    res
      .status(201)
      .json({ message: "Issue created successfully", issueID: issue._id });
  } catch (error) {
    console.log("error during creating issue", error);
    res
      .status(500)
      .json({ message: "error during creating issue", error: error.message });
  }
}

const updateIssueById = async (req, res) => {
  const { issueID } = req.params;
  const { title, description } = req.body;
  const issue = await issueModel.findById(issueID);
  try {
    if (!issue) {
      return res.status(404).send("Issue not found");
    }
    issue.title = title;
    issue.description = description;
    await issue.save();
    res.status(200).json({ message: "Issue updated successfully", issue });
  } catch (error) {
    console.log("error during updating issue", error);
    res
      .status(500)
      .json({ message: "error during updating issue", error: error.message });
  }
};
const deleteIssueById = async (req, res) => {
const{issueID}=req.params;
try{
const issue=await issueModel.findByIdAndDelete(issueID);
if(!issue){
    return res.status(404).send("Issue not found");
}
res.status(200).json({message:"Issue deleted successfully",issue});
}
catch(error){
    console.log("error during deleting issue",error);
    res.status(500).json({message:"error during deleting issue",error:error.message});
}
};
const getAllIssues = async (req, res) => {
const{userID}=req.params;
try{
    const issues=await issueModel.find({repository:userID});
    if(!issues){
        return res.status(404).send("Issues not found");
    }
    res.status(200).json({message:"Issues fetched successfully",issues});
}
catch(error){
    console.log("error during fetching issues",error);
    res.status(500).json({message:"error during fetching issues",error:error.message});
}
};
const getIssueById = async (req, res) => {
const{issueID}=req.params;
try{
    const issue=await issueModel.findById(issueID);
    if(!issue){
        return res.status(404).send("Issue not found");
    }
    res.status(200).json({message:"Issue fetched successfully",issue});
}
catch(error){
    console.log("error during fetching issue",error);
    res.status(500).json({message:"error during fetching issue",error:error.message});
}
};
export {
  createIssue,
  updateIssueById,
  deleteIssueById,
  getAllIssues,
  getIssueById,
};
