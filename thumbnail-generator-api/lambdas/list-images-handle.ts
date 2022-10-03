import { injectLambdaContext } from '@aws-lambda-powertools/logger';
import middy from '@middy/core';
import { LambdaBootstrap } from '../src/contexts/shared/bootstrap/lambda.bootstrap';
import { imageListModule } from '../src/injection/processing-image.injection';

class LambdaListImages extends LambdaBootstrap<unknown, unknown> {
  handler = async () => {
    this.logger.info({ message: 'Event list images' });
    const listImages = await imageListModule.imageList();
    return this.formatJSONResponse({ message: listImages });
  };
}

const lambdaProcessingImage = new LambdaListImages({
  serviceName: 'list-images',
});

export const handler = middy(lambdaProcessingImage.handler).use(
  injectLambdaContext(lambdaProcessingImage.logger),
);
