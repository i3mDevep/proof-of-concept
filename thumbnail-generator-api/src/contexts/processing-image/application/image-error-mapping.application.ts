import { ImageMimeError } from '../domain/image-mime.error';
import { ImageSizeError } from '../domain/image-size.error';

export class ImageMappingErrorApplication {
  public mappingErrors = new Map(
    [new ImageMimeError(), new ImageSizeError()].map((error) => [
      error.constructor,
      error,
    ]),
  );

  public isDomainError = <T extends Error>(error: T) => {
    return !!this.mappingErrors.get(error.constructor);
  };

  public static getInfoError = <T extends Error>(error: T) => ({
    message: error?.message,
  });
}
