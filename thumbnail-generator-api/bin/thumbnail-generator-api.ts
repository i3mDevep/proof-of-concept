import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { ThumbnailGeneratorApiStack } from '../lib/thumbnail-generator-api-stack';

const app = new cdk.App();

// function capitalize(s: string) {
//   return s[0].toUpperCase() + s.slice(1);
// }

// (['dev', 'qa', 'prod'] as stagesType[]).forEach((stage) => {
//   new ThumbnailGeneratorApiStack(
//     app,
//     `ThumbnailGeneratorApiStack${capitalize(stage)}`,
//     {
//       projectName: `thumbnail-generator-${stage}`,
//       stage,
//     },
//   );
// });

new ThumbnailGeneratorApiStack(app, `ThumbnailGeneratorApiStackDev`, {
  projectName: `thumbnailGeneratorDev`,
  stage: 'dev',
});
