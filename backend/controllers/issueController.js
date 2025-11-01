const createIssue = async (req, res) => {
    res.send("Issue created successfully");
};

const updateIssueById = async (req, res) => {
    res.send("Issue updated successfully");
};
const deleteIssueById = async (req, res) => {
    res.send("Issue deleted successfully");
};
const getAllIssues = async (req, res) => {
    res.send("Issue fetched successfully");
};
const getIssueById = async (req, res) => {
    res.send("Issue fetched successfully");
};
module.exports={
    createIssue,
    updateIssueById,
    deleteIssueById,
    getAllIssues,
    getIssueById
};
    