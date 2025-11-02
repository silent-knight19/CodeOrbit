import { promises as fs } from "fs";
import path from "path";

export async function addFiles(filePath) {
    const repoPath = path.resolve(process.cwd(), ".MyGit");
    const stagingPath = path.join(repoPath, "staging");

    try {
        await fs.mkdir(stagingPath, { recursive: true });
        const fileName = path.basename(filePath); 
        await fs.copyFile(filePath, path.join(stagingPath, fileName));
        console.log(`File ${fileName} added to staging area`);
    }
    catch(err){
        console.error("Error adding file to staging area", err);
    }
    
   
}
   