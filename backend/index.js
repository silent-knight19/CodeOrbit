const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const http = require("http");

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

  app.use(bodyParser.json());
  app.use(express.json());

  const MONGO_URI = process.env.MONGODB_URI;
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.log("Error connecting to MongoDB : ", error);
    });
}
