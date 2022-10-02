import { MimeImage } from './mime.vo';
import { SizeImage } from './size.vo';

export interface ImageProcessingProps {
  id: string;
  content: Buffer;
  name: string;
  mimetype: string;
}

export class ImageProcessing {
  private readonly id: string;

  private readonly content: Buffer;

  private readonly name: string;

  private readonly mimetype: string;

  constructor(props: ImageProcessingProps) {
    Object.assign(this, props);
  }

  static validateProps(props: ImageProcessingProps) {
    SizeImage.validate(props.content);
    MimeImage.validate(props.mimetype);
    return new ImageProcessing(props);
  }

  getAttributes(): ImageProcessingProps {
    return {
      ...(this as unknown as ImageProcessingProps),
    };
  }
}
