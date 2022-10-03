import * as path from 'path';

import * as lambdaNodeJs from 'aws-cdk-lib/aws-lambda-nodejs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';

import { Construct } from 'constructs';
import { aws_apigateway as awsApigateway } from 'aws-cdk-lib';
import { Architecture } from 'aws-cdk-lib/aws-lambda';

interface ListImageProps {
  bucketProcessing: s3.Bucket;
  cdn: string;
  imageResorceThumbnail: awsApigateway.Resource;
}

export class ListImages extends Construct {
  public readonly lambdaListImages: lambdaNodeJs.NodejsFunction;

  constructor(scope: Construct, id: string, props: ListImageProps) {
    super(scope, id);

    this.lambdaListImages = new lambdaNodeJs.NodejsFunction(
      this,
      `${id}Lambda`,
      {
        entry: path.resolve(
          __dirname,
          '../../',
          'lambdas/list-images-handle.ts',
        ),
        functionName: `${id}-lambda`,
        handler: 'handler',
        runtime: lambda.Runtime.NODEJS_16_X,
        architecture: Architecture.ARM_64,
        bundling: {
          nodeModules: ['@aws-sdk/client-s3'],
        },
        environment: {
          CDN_IMAGES: props.cdn,
        },
      },
    );

    props.imageResorceThumbnail.addMethod(
      'GET',
      new apigateway.LambdaIntegration(this.lambdaListImages),
    );

    props.bucketProcessing.grantReadWrite(this.lambdaListImages);
  }
}
