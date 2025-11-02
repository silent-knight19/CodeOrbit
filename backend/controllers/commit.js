import { promises as fs } from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export async function commitChanges(message) {
  const repoPath = path.resolve(process.cwd(), ".MyGit");
  const stagingPath = path.join(repoPath, "staging");
  const commitPath = path.join(repoPath, "commits");
  try {
    const commitId = uuidv4();
    const commitDir = path.join(commitPath, commitId);
    await fs.mkdir(commitDir, { recursive: true });
    const files = await fs.readdir(stagingPath);
    for (const file of files) {
      await fs.copyFile(
        path.join(stagingPath, file),
        path.join(commitDir, file)
      );
    }
    await fs.writeFile(path.join(commitDir, "commit.json"), JSON.stringify({
        message,
        timestamp: new Date().toISOString(),
    }));
    console.log(`Committed changes: ${commitId} ${message}`);
    
  } catch (err) {
    console.error("Error committing changes", err);
  }
}
