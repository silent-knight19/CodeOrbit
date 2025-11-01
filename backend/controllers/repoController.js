const createRepo = async (req, res) => {
  res.send("Repo created successfully");
};
const getAllRepos = async (req, res) => {
  res.send("All repos fetched successfully");
};

const fetchRepoById = async (req, res) => {
  res.send("Repo fetched successfully");
};

const fetchRepoByName= async (req, res) => {
  res.send("Repo fetched successfully");
};

const fetchRepoForCurrentUser= async (req, res) => {
  res.send("Repo fetched for logged in user successfully");
};

const updateRepobyId= async (req, res) => {
  res.send("Repo updated successfully");
};

const togglevisibilityById= async (req, res) => {
  res.send("Repo visibility toggled successfully");
};
const deleteRepobyId= async (req, res) => {
  res.send("Repo deleted successfully");
};
module.exports={
  createRepo,
  getAllRepos,
  fetchRepoById,
  fetchRepoByName,
  fetchRepoForCurrentUser,
  updateRepobyId,
  togglevisibilityById,
  deleteRepobyId
};