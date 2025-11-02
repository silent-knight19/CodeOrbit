import AWS from "aws-sdk";

AWS.config.update({
  region: "ap-south-1",
});

export const s3 = new AWS.S3();
export const s3_bucket = "samplebucketsachin786";
