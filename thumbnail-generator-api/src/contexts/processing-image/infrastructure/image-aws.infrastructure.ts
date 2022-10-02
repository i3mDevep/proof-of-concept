import { S3Bootstrap } from '../../shared/bootstrap/s3.bootstrap';
import { ImageProcessing } from '../domain/image.aggregate-root';
import { ImageRepository } from '../domain/image.repository';

export class ImageInfrastructure implements ImageRepository {
  private s3: S3Bootstrap;

  constructor(
    private bucketProccesingImages: string,
    private bucketImagesConvert: string,
  ) {
    this.s3 = new S3Bootstrap();
  }

  async getImageById(id: string): Promise<ImageProcessing> {
    const imageBuffer = await this.s3.getObject({
      Bucket: this.bucketImagesConvert,
      Key: id,
    });

    return new ImageProcessing({
      content: imageBuffer.buffer as Buffer,
      id,
      mimetype: imageBuffer.Body.Metadata?.mime_type ?? 'unknow',
      name: id,
    });
  }

  async persistenceBatchImages(images: ImageProcessing[]): Promise<void> {
    await Promise.all(
      images.map((image) =>
        this.s3.putObjectParalleUp({
          Bucket: this.bucketProccesingImages,
          Key: image.getAttributes().id,
          Body: image.getAttributes().content,
          ContentType: image.getAttributes().mimetype,
        }),
      ),
    );
  }

  async persistenceImage(image: ImageProcessing): Promise<void> {
    await this.s3.putObjectParalleUp({
      Bucket: this.bucketImagesConvert,
      Key: image.getAttributes().id,
      Body: image.getAttributes().content,
      ContentType: image.getAttributes().mimetype,
      Metadata: {
        mime_type: image.getAttributes().mimetype,
        utm_upload: 'thumbail-generator',
        image_source: image.getAttributes().id,
      },
    });
  }
}
