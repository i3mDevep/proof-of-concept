import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { CfnOutput } from 'aws-cdk-lib';
import { UploadImage } from '../contructors/upload-image/infra';
import { ProcessingImage } from '../contructors/processing-image/infra';
import { CreateConstructsFormat } from '../src/utils/generate-ids';
import {
  ENVIRONMENT_TYPE,
  ThumbnailEnvironment,
} from '../environment/thumbnail.environment';
import { CdnImages } from '../contructors/cdn-images/infra';
import { ListImages } from '../contructors/list-images/infra';

export class ThumbnailGeneratorApiStack extends cdk.Stack {
  constructor(
    scope: Construct,
    id: string,
    props: cdk.StackProps & ENVIRONMENT_TYPE,
  ) {
    super(scope, id, props);

    const { projectName, stage } = props;

    const genIds = new CreateConstructsFormat(projectName, stage);
    const thumbnailEnvironment = new ThumbnailEnvironment(stage);
    const { BUCKET_CONVERT_IMAGE, BUCKET_PROCESSING_IMAGE } =
      thumbnailEnvironment.config.getEnvironment();

    const apiThumbnail = new apigateway.RestApi(
      this,
      genIds.getConstructId('ApiGateway'),
      {
        description: 'thumbnail api gateway',
        defaultCorsPreflightOptions: {
          allowHeaders: [
            'Content-Type',
            'X-Amz-Date',
            'Authorization',
            'X-Api-Key',
          ],
          allowMethods: ['OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
          allowCredentials: true,
          allowOrigins: ['*'],
        },
      },
    );

    const imageResorceThumbnail = apiThumbnail.root.addResource('image');

    const { s3BucketImageConvert } = new UploadImage(
      this,
      genIds.getConstructId('uploadImage'),
      {
        bucketName: BUCKET_CONVERT_IMAGE,
        imageResorceThumbnail,
      },
    );

    const { s3BucketImageProcessing } = new ProcessingImage(
      this,
      genIds.getConstructId('processingImages'),
      {
        bucketConvert: s3BucketImageConvert,
        bucketNameProcessing: BUCKET_PROCESSING_IMAGE,
      },
    );

    const { domain } = new CdnImages(
      this,
      genIds.getConstructId('listImages'),
      {
        imagesBucket: s3BucketImageProcessing,
      },
    );

    new ListImages(this, genIds.getConstructId('listImagesFunction'), {
      bucketProcessing: s3BucketImageProcessing,
      cdn: domain,
      imageResorceThumbnail,
    });

    new CfnOutput(this, genIds.getConstructId('apiUrl'), {
      value: apiThumbnail.url,
    });
  }
}
