import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);
const BucketUriFrontent = "s3://thumbnail-cdn-app--dev";
const profile = "me";

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
