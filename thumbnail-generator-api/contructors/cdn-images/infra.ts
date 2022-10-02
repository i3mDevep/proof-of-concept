import { Distribution } from 'aws-cdk-lib/aws-cloudfront';
import { S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

interface CdnImagesProps {
  imagesBucket: Bucket;
}

export class CdnImages extends Construct {
  constructor(scope: Construct, id: string, props: CdnImagesProps) {
    super(scope, id);
    new Distribution(this, `${id}CloudFront`, {
      defaultBehavior: { origin: new S3Origin(props.imagesBucket) },
    });
  }
}
