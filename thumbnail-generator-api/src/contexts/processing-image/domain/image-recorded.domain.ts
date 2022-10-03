export interface ImageRecordedProps {
  url: string;
}

export class ImageRecorded {
  private readonly url: string;

  constructor(props: ImageRecordedProps) {
    Object.assign(this, props);
  }

  static fromPrimitives(pros: ImageRecordedProps) {
    return new ImageRecorded(pros);
  }

  getAttributes(): ImageRecordedProps {
    return {
      ...(this as unknown as ImageRecordedProps),
    };
  }
}
