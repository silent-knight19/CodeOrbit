const fs = require("fs").promises;
const path = require("path");

async function initRepo(){
    const repoPath = path.resolve(process.cwd(), ".git");
    const commitPath = path.join(repoPath, "commits");
    try{
        await fs.mkdir(repoPath, { recursive: true });
        await fs.mkdir(commitPath, { recursive: true });
        await fs.writeFile(path.join(repoPath, "config.json"), JSON.stringify({
            bucket: process.env.AWS_BUCKET_NAME,
            }
        ) );
        console.log("Repository initialized successfully");
    }
    catch(err){
        console.error("Error initializing repository", err);
    }
}
module.exports={initRepo};
