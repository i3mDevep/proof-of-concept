import { injectLambdaContext } from '@aws-lambda-powertools/logger';
import middy from '@middy/core';
import { APIGatewayProxyResult, Handler, S3Event } from 'aws-lambda';
import { LambdaBootstrap } from '../src/contexts/shared/bootstrap/lambda.bootstrap';
import { thumbnailImagesModule } from '../src/injection/processing-image.injection';

class LambdaProcessingImage extends LambdaBootstrap<
  S3Event,
  APIGatewayProxyResult
> {
  handler: Handler<S3Event, APIGatewayProxyResult> = async (event) => {
    this.logger.info({ message: 'Event processing images', ...event.Records });
    const { Records } = event;
    const tasks = Records.map((record) => {
      return thumbnailImagesModule.thumbnailImages(record.s3.object.key);
    });

    await Promise.all(tasks);
    return this.formatJSONResponse({ message: 'Imagen procesed' });
  };
}

const lambdaProcessingImage = new LambdaProcessingImage({
  serviceName: 'processing-images',
});
export const handler = middy(lambdaProcessingImage.handler).use(
  injectLambdaContext(lambdaProcessingImage.logger),
);
