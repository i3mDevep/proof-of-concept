export class ImageSizeError extends Error {
  constructor() {
    super("'The image must not be larger than 5 MB'");
  }
}
