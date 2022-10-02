import * as path from 'path';

import * as lambdaNodeJs from 'aws-cdk-lib/aws-lambda-nodejs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';

import { Construct } from 'constructs';
import { aws_apigateway as awsApigateway, Duration } from 'aws-cdk-lib';
import { Architecture } from 'aws-cdk-lib/aws-lambda';

interface UploadImageProps {
  bucketName: string;
  imageResorceThumbnail: awsApigateway.Resource;
}

export class UploadImage extends Construct {
  public readonly s3BucketImageConvert: s3.Bucket;

  public readonly lambdaUploadImage: lambdaNodeJs.NodejsFunction;

  constructor(scope: Construct, id: string, props: UploadImageProps) {
    super(scope, id);

    this.s3BucketImageConvert = new s3.Bucket(this, `${id}-bucket-processing`, {
      bucketName: props.bucketName,
    });

    this.lambdaUploadImage = new lambdaNodeJs.NodejsFunction(
      this,
      `${id}Lambda`,
      {
        entry: path.resolve(
          __dirname,
          '../../',
          'lambdas/upload-image-handle.ts',
        ),
        functionName: `${id}-lambda`,
        handler: 'handler',
        runtime: lambda.Runtime.NODEJS_16_X,
        architecture: Architecture.ARM_64,
        timeout: Duration.seconds(60),
        memorySize: 512,
        bundling: {
          nodeModules: ['@aws-sdk/client-s3', '@aws-sdk/lib-storage'],
        },
        environment: {
          BUCKET_CONVERT_IMAGE: props.bucketName,
          BUCKET_PROCESSING_IMAGE: 'unknow',
        },
      },
    );

    props.imageResorceThumbnail.addMethod(
      'POST',
      new apigateway.LambdaIntegration(this.lambdaUploadImage),
    );

    this.s3BucketImageConvert.grantReadWrite(this.lambdaUploadImage);
  }
}
