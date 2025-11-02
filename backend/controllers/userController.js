import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { MongoClient, ObjectId as objectId } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI;

let client;

async function connectClient() {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }
}

async function getAllUsers(req, res) {
  try {
    await connectClient();
    const db = client.db("codeOrbit");
    const userCollection = db.collection("users");
    const users = await userCollection.find({}).toArray();
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function signup(req, res) {
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
}

async function login(req, res) {
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
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    res.json({
      token,
      userId: user._id,
      email: user.email,
      username: user.username,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
async function getUsersProfile(req, res) {
  const currentId = req.params.id;
  try {
    await connectClient();
    const db = client.db("codeOrbit");
    const userCollection = db.collection("users");
    const user = await userCollection.findOne({ _id: new objectId(currentId) });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    res.json({
      message: "User found successfully",
      user: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function updateUserProfile(req, res) {
  try {
    const currentId = req.params.id || req.body.id; // Get ID from params or body
    const { email, username, password } = req.body;
    
    if (!currentId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Validate if the ID is a valid MongoDB ObjectId
    if (!objectId.isValid(currentId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    await connectClient();
    const db = client.db("codeOrbit");
    const userCollection = db.collection("users");
    
    let updatedFields = {};
    
    if (email) updatedFields.email = email;
    if (username) updatedFields.username = username;
    
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updatedFields.password = await bcrypt.hash(password, salt);
    }
    
    if (Object.keys(updatedFields).length === 0) {
      return res.status(400).json({ message: "No valid fields to update" });
    }
    
    const result = await userCollection.findOneAndUpdate(
      { _id: new objectId(currentId) },
      { $set: updatedFields },
      { returnDocument: "after" }
    );
    
    if (!result.value) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // Remove sensitive data before sending response
    const { password: _, ...userWithoutPassword } = result.value;
    
    res.status(200).json({
      message: "User updated successfully",
      user: userWithoutPassword
    });
    
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ 
      message: "Error updating user profile",
      error: error.message 
    });
  }
}

async function deleteUserProfile(req, res) {
  try {
    const currentId = req.params.id;
    
    if (!currentId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Validate if the ID is a valid MongoDB ObjectId
    if (!objectId.isValid(currentId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }
    
    await connectClient();
    const db = client.db("codeOrbit");
    const userCollection = db.collection("users");
    
    const result = await userCollection.deleteOne({
      _id: new objectId(currentId)
    });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete profile error:", error);
    res.status(500).json({ 
      message: "Error deleting user profile",
      error: error.message 
    });
  }
}

export {
  getAllUsers,
  signup,
  login,
  getUsersProfile,
  updateUserProfile,
  deleteUserProfile,
};
