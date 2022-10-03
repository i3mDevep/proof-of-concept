import { ImageRepository } from '../domain/image.repository';

const { CDN_IMAGES } = process.env;

export class ImageList {
  constructor(private operations: ImageRepository) {}

  public imageList = async () => {
    const images = await this.operations.getListImages();
    return images.map(
      (image) => `https://${CDN_IMAGES}/${image.getAttributes().url}`,
    );
  };
}
