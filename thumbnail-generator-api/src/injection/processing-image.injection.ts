import { ImagePersistence } from '../contexts/processing-image/application/image-persistence.application';
import { ImageThumbnail } from '../contexts/processing-image/application/image-thumbnail.application';
import { ImageInfrastructure } from '../contexts/processing-image/infrastructure/image-aws.infrastructure';

const {
  BUCKET_CONVERT_IMAGE = 'bucket-convert-image--dev',
  BUCKET_PROCESSING_IMAGE = 'bucket-processing-image--dev',
} = process.env;

if (!BUCKET_CONVERT_IMAGE || !BUCKET_PROCESSING_IMAGE)
  throw new Error('BUCKET_CONVERT_IMAGE or BUCKET_PROCESSING_IMAGE dont exist');

const imageModule = new ImagePersistence(
  new ImageInfrastructure(BUCKET_PROCESSING_IMAGE, BUCKET_CONVERT_IMAGE),
);

const thumbnailImagesModule = new ImageThumbnail(
  new ImageInfrastructure(BUCKET_PROCESSING_IMAGE, BUCKET_CONVERT_IMAGE),
);

export { imageModule, thumbnailImagesModule };
