export class ImageMimeError extends Error {
  constructor() {
    super('Image must be JPGE or PNG');
  }
}
