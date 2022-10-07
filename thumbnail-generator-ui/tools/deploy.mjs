import { config } from "dotenv";
import { exec } from "child_process";
import { promisify } from "util";

config({ path: `.env.${process.env.NODE_ENV}` });

const { VITE_BUCKET_FRONTEND, AWS_PROFILE } = process.env;

const execAsync = promisify(exec);
const BucketUriFrontent = VITE_BUCKET_FRONTEND;
const profile = AWS_PROFILE || "default";

// Build process
try {
  const commandToBuild = `npm run build`;
  const { stdout } = await execAsync(commandToBuild);
  console.info("Build process", stdout);
} catch (error) {
  console.error("Build error", error);
}
// will save dist in bucket
try {
  const commandToClearBucket = `aws s3 rm ${BucketUriFrontent} --recursive --profile ${profile}`;
  const commandToSavedBucket = `aws s3 cp dist/ ${BucketUriFrontent} --recursive --profile ${profile}`;

  await execAsync(commandToClearBucket);

  const { stdout } = await execAsync(commandToSavedBucket);
  console.info("S3 process", stdout);
} catch (error) {
  console.error("s3 error", error);
}
