// import * as cdk from 'aws-cdk-lib';
// import { Template } from 'aws-cdk-lib/assertions';
// import * as ThumbnailGeneratorApi from '../lib/thumbnail-generator-api-stack';

// example test. To run these tests, uncomment this file along with the
// example resource in lib/thumbnail-generator-api-stack.ts
import { ImageProcessing } from "../src/contexts/processing-image/domain/image.aggregate-root";

test("Validate props ImageProcessing", async () => {
  ImageProcessing.validateProps({
    image: Buffer.from("124"),
    name: "Resize",
    height: 20,
    width: 40,
  });
});
