const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();

const uri = process.env.MONGO_URI;

let client;

async function connectClient() {
    if (!client) {
        client = new MongoClient(uri);
        await client.connect();
    }
}

const getAllUsers = async (req, res) => {
  try{
    await connectClient();
    const db = client.db("codeOrbit");
    const userCollection = db.collection("users");
    const users = await userCollection.find().toArray();
    res.json(users);
  }
  catch(error){
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    await connectClient();
    const db = client.db("codeOrbit");
    const userCollection = db.collection("users");

    const user = await userCollection.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      username,
      password: hashedPassword,
      email,
      repos: [],
      followedUsers: [],
      starRepos: [],
    };

    const result = await userCollection.insertOne(newUser);

    const token = jwt.sign(
      { id: result.insertedId },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const login = (req, res) => {
  res.send("User login");
};
const getAllUsersProfile = (req, res) => {
  res.send("All users profile");
};
const updateUserProfile = (req, res) => {
  res.send("profile updated");
};
const deleteUserProfile = (req, res) => {
  res.send("profile deleted");
};

module.exports = {
  getAllUsers,
  signup,
  login,
  getAllUsersProfile,
  updateUserProfile,
  deleteUserProfile,
};