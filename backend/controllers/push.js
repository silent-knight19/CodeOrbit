const fs = require("fs").promises;
const path = require("path");
const { s3, s3_bucket } = require("../config/aws-config");

async function pushChanges() {
    const repoPath = path.resolve(process.cwd(), ".MyGit");

    const commitsPath = path.join(repoPath, "commits");
    try {
        const commitDirs = await fs.readdir(commitsPath);
        for (const commitDir of commitDirs) {

            const commitpath = path.join(commitsPath,commitDir);
            const fileContent = await fs.readdir(commitpath);

            for (const file of fileContent) 
                {
                const filePath = path.join(commitpath,file);
                const fileContent = await fs.readFile(filePath);
                const params = {
                    Bucket: s3_bucket,
                    Key: `commit/${commitDir}/${file}`,
                    Body: fileContent,
                };
                await s3.upload(params).promise();
                
            }

        }
        console.log("Changes pushed to remote repository");
    } catch (err) {
        console.error("Error pushing changes", err);
    }
}
module.exports={pushChanges};
