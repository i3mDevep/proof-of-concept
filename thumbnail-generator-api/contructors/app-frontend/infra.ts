import {
  Distribution,
  ResponseHeadersPolicy,
} from 'aws-cdk-lib/aws-cloudfront';
import { S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins';
import { Bucket, HttpMethods } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export class AppFrontend extends Construct {
  public cdnFrontend: Distribution;

  public s3BuildAppFrontend: Bucket;

  constructor(
    scope: Construct,
    id: string,
    { bucketCndFrontend }: { bucketCndFrontend: string },
  ) {
    super(scope, id);

    this.s3BuildAppFrontend = new Bucket(this, `${id}BucketFrontend`, {
      bucketName: bucketCndFrontend,
      cors: [
        {
          allowedMethods: [HttpMethods.GET, HttpMethods.POST, HttpMethods.PUT],
          allowedOrigins: ['*'],
          allowedHeaders: ['*'],
        },
      ],
    });
    this.cdnFrontend = new Distribution(this, `${id}CloudFront`, {
      defaultRootObject: 'index.html',
      defaultBehavior: {
        origin: new S3Origin(this.s3BuildAppFrontend),
        responseHeadersPolicy: ResponseHeadersPolicy.CORS_ALLOW_ALL_ORIGINS,
      },
      additionalBehaviors: {},
      // errorResponses: [
      //   {
      //     httpStatus: 403,
      //     responseHttpStatus: 200,
      //     responsePagePath: 'index.html',
      //   },
      // ],
    });
  }
}
