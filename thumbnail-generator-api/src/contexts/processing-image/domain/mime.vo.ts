import * as jimp from 'jimp';
import { ImageMimeError } from './image-mime.error';

export class MimeImage {
  // The API must ONLY accept PNG and JPEG files
  static validate(mimetype: string) {
    if (mimetype !== jimp.MIME_JPEG && mimetype !== jimp.MIME_PNG)
      throw new ImageMimeError();
    return null;
  }
}
