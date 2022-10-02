import { ImageSizeError } from './image-size.error';

export abstract class SizeImage {
  // The API must reject input file bigger than 5MB
  static validate(image: Buffer) {
    if (image.toString().length / 1024 > 5120) throw new ImageSizeError();
  }
}
