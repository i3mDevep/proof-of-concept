import { ImagePersistence } from '../contexts/processing-image/application/image-persistence.application';
import { ImageThumbnail } from '../contexts/processing-image/application/image-thumbnail.application';
import { ImageList } from '../contexts/processing-image/application/image-list.application';

import { ImageInfrastructure } from '../contexts/processing-image/infrastructure/image-aws.infrastructure';

const {
  BUCKET_CONVERT_IMAGE = 'bucket-convert-image--dev',
  BUCKET_PROCESSING_IMAGE = 'bucket-processing-image--dev',
} = process.env;

const awsInfrastructire = new ImageInfrastructure(
  BUCKET_PROCESSING_IMAGE,
  BUCKET_CONVERT_IMAGE,
);

const imageModule = new ImagePersistence(awsInfrastructire);

const thumbnailImagesModule = new ImageThumbnail(awsInfrastructire);

const imageListModule = new ImageList(awsInfrastructire);

export { imageModule, thumbnailImagesModule, imageListModule };
