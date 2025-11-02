import { promises as fs } from "fs";
import path from "path";

async function revertChanges(commitID) {
  const repoPath = path.resolve(process.cwd(), ".MyGit");
  const commitsPath = path.join(repoPath, "commits");
  try {
    const commitDir = path.join(commitsPath, commitID);
    const files = await fs.readdir(commitDir);
    const parentDir = path.resolve(repoPath, "..");
    for (const file of files) {
      await fs.copyFile(
        path.join(commitDir, file),
        path.join(parentDir, file)
      );
    }
    console.log('Reverted to commit: ', commitID);
  } catch (err) {
    console.log('Error Reverting to commit: ', commitID, err);
  }
}

export { revertChanges };