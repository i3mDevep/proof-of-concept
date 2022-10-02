/* eslint-disable @typescript-eslint/no-explicit-any */
import { generate } from 'short-uuid';
import middy from '@middy/core';
import middyJsonBodyParser from '@middy/http-json-body-parser';

import { APIGatewayProxyResult, Handler } from 'aws-lambda';
import { injectLambdaContext } from '@aws-lambda-powertools/logger';
import { ImageProcessing } from '../src/contexts/processing-image/domain/image.aggregate-root';
import { imageModule } from '../src/injection/processing-image.injection';

import type { FileAPIGatewayProxyEvent } from '../src/types/lambda-gateway.types';
import { LambdaBootstrap } from '../src/contexts/shared/bootstrap/lambda.bootstrap';
import { ImageMappingErrorApplication } from '../src/contexts/processing-image/application/image-error-mapping.application';

class LambdaUploadImage extends LambdaBootstrap<
  FileAPIGatewayProxyEvent,
  APIGatewayProxyResult
> {
  handler: Handler<FileAPIGatewayProxyEvent, APIGatewayProxyResult> = async (
    event,
  ) => {
    try {
      const { imagen } = event.body;
      const id = generate();
      const buffer = LambdaUploadImage.getBufferEncondingBase64(imagen);
      const mimetype = LambdaUploadImage.getMimeType(imagen);
      const name = `${id}.${LambdaUploadImage.getExtension(imagen)}`;
      this.logger.info({ message: 'Imagen content', imagen, mimetype, name });

      await imageModule.persistenceImage(
        ImageProcessing.validateProps({
          id: name,
          content: buffer,
          name,
          mimetype,
        }),
      );
      return this.formatJSONResponse({ message: 'imagen saved' });
    } catch (error: any) {
      this.logger.error(`Error upload`, error);
      const mappingError = new ImageMappingErrorApplication();
      if (mappingError.isDomainError(error))
        return this.formatJSONResponse(
          { ...ImageMappingErrorApplication.getInfoError(error) },
          400,
        );

      return this.formatJSONResponse({ message: 'error unknow' }, 400);
    }
  };

  private static getMimeType(data: string) {
    return data.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)?.[0] ?? 'image/png';
  }

  private static getExtension(data: string) {
    return data.match(/[^:/]\w+(?=;|,)/)?.[0] ?? 'png';
  }

  private static getBufferEncondingBase64(data: string) {
    return Buffer.from(data.replace(/data:.*base64,/, ''), 'base64');
  }
}

const lambdaUploadImage = new LambdaUploadImage({
  serviceName: 'upload-image-to-process',
});
export const handler = middy(lambdaUploadImage.handler)
  .use(middyJsonBodyParser())
  .use(injectLambdaContext(lambdaUploadImage.logger));
