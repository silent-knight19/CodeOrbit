const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
var objectId = require("mongodb").ObjectId;

dotenv.config();

const uri = process.env.MONGODB_URI;

let client;

async function connectClient() {
    if (!client) {
        client = new MongoClient(uri);
        await client.connect();
    }
}

async function getAllUsers (req, res) {
  try{
    await connectClient();
    const db = client.db("codeOrbit");
    const userCollection = db.collection("users");
    const users = await userCollection.find({}).toArray();
    res.json(users);
  }
  catch(error){
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

async function signup (req, res) {
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

async function login (req, res) {
  const { email, password } = req.body;
  try {
    await connectClient();
    const db = client.db("codeOrbit");
    const userCollection = db.collection("users");
    const user = await userCollection.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "invalid credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "invalid credentials" });
    }
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.json({ 
      token,
      userId: user._id, 
      email: user.email,
      username: user.username
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
async function getUsersProfile (req, res) {
  const currentId = req.params.id;
  try{
    await connectClient();
    const db = client.db("codeOrbit");
    const userCollection = db.collection("users");
    const user = await userCollection.findOne({ _id: new objectId(currentId) });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    res.json({ 
      message: "User found successfully",
      user: user
    });
  }
  catch(error){
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
async function updateUserProfile (req, res) {
  res.send("profile updated");
};
async function deleteUserProfile (req, res) {
  res.send("profile deleted");
};

module.exports = {
  getAllUsers,
  signup,
  login,
  getUsersProfile,
  updateUserProfile,
  deleteUserProfile,
};