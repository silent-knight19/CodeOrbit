const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const http = require("http");
const { Server } = require("socket.io");
const mainRouter=require("./routes/main.router");

const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const { initRepo } = require("./controllers/init");
const { addFiles } = require("./controllers/add");
const { commitChanges } = require("./controllers/commit");
const { pushChanges } = require("./controllers/push");
const { pullChanges } = require("./controllers/pull");
const { revertChanges } = require("./controllers/revert");

dotenv.config();

yargs(hideBin(process.argv))
  .command(
    "start",
    "Start the server",
    () => {},
    () => {
      startServer();
    }
  )
  .command(
    "init",
    "Initialize a new git repository",
    () => {},
    () => {
      initRepo();
    }
  )
  .command(
    "add <file>",
    "Add Files to the staging area",
    (yargs) => {
      return yargs.positional("file", {
        describe: "File to add to the staging area",
        type: "string",
      });
    },
    (argv) => {
      addFiles(argv.file);
    }
  )
  .command(
    "commit <message>",
    "Commit the changes to the repository",
    (yargs) => {
      return yargs.positional("message", {
        describe: "Commit message",
        type: "string",
      });
    },
    (argv) => {
      commitChanges(argv.message);
    }
  )
  .command("push", "Push the changes to the remote repository", {}, pushChanges)
  .command(
    "pull",
    "Pull the changes from the remote repository",
    {},
    pullChanges
  )
  .command(
    "revert <commitID>",
    "Revert the changes to the repository",
    (yargs) => {
      return yargs.positional("commitID", {
        describe: "Commit ID to revert",
        type: "string",
      });
    },
    (argv) => {
      revertChanges(argv.commitID);
    }
  )
  .demandCommand(1, "Please provide a command")
  .help().argv;

function startServer() {
  const app = express();
  const port = process.env.PORT || 3000;

  app.use(express.json());
  app.use(cors({ origin: "*" }));

  app.use("/api", mainRouter);

  const MONGO_URI = process.env.MONGODB_URI;

  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB: ", error);
    });

  app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
  });
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
  });
  
let user="testuser"
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("joinRoom", (userID) => {
      const user = user;
      console.log("User joined room:", user);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });

  const db = mongoose.connection;
  db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
  });

  db.once('open', () => {
    console.log('Connected to MongoDB');
    
    server.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  });
}