import * as path from 'path';

import * as lambdaNodeJs from 'aws-cdk-lib/aws-lambda-nodejs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as s3 from 'aws-cdk-lib/aws-s3';

import { Construct } from 'constructs';
import { Duration } from 'aws-cdk-lib';
import { Architecture } from 'aws-cdk-lib/aws-lambda';
import { S3EventSource } from 'aws-cdk-lib/aws-lambda-event-sources';
import { EventType } from 'aws-cdk-lib/aws-s3';

interface ProcessingImageProps {
  bucketNameProcessing: string;
  bucketConvert: s3.Bucket;
}

export class ProcessingImage extends Construct {
  public readonly s3BucketImageProcessing: s3.Bucket;

  public readonly lambdaProcessingImage: lambdaNodeJs.NodejsFunction;

  constructor(scope: Construct, id: string, props: ProcessingImageProps) {
    super(scope, id);

    this.s3BucketImageProcessing = new s3.Bucket(
      this,
      `${id}-bucket-processing`,
      {
        bucketName: props.bucketNameProcessing,
      },
    );

    this.lambdaProcessingImage = new lambdaNodeJs.NodejsFunction(
      this,
      `${id}Lambda`,
      {
        entry: path.resolve(
          __dirname,
          '../../',
          'lambdas/processing-image-handle.ts',
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
          BUCKET_CONVERT_IMAGE: props.bucketConvert.bucketName,
          BUCKET_PROCESSING_IMAGE: this.s3BucketImageProcessing.bucketName,
        },
      },
    );

    this.lambdaProcessingImage.addEventSource(
      new S3EventSource(props.bucketConvert, {
        events: [EventType.OBJECT_CREATED],
      }),
    );

    props.bucketConvert.grantReadWrite(this.lambdaProcessingImage);
    this.s3BucketImageProcessing.grantReadWrite(this.lambdaProcessingImage);
  }
}
