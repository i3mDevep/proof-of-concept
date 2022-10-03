import { S3Bootstrap } from '../../shared/bootstrap/s3.bootstrap';
import { ImageRecorded } from '../domain/image-recorded.domain';
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

  async getListImages(): Promise<ImageRecorded[]> {
    const result = await this.s3.getListObject({
      Bucket: this.bucketProccesingImages,
    });
    const deleteNullResult =
      result.Contents?.filter((rc) => !!rc.Key)?.map((cont) => ({
        url: cont.Key as string,
      })) || [];
    return deleteNullResult.map(ImageRecorded.fromPrimitives);
  }

  async getImageById(
    id: string,
    bucket = this.bucketImagesConvert,
  ): Promise<ImageProcessing> {
    const imageBuffer = await this.s3.getObject({
      Bucket: bucket,
      Key: id,
    });

    return new ImageProcessing({
      content: imageBuffer.buffer as Buffer,
      id,
      mimetype: imageBuffer.Body.Metadata?.mime_type ?? 'unknow',
      name: id,
    });
  }

  async persistenceBatchImages(
    images: ImageProcessing[],
    bucket = this.bucketProccesingImages,
  ): Promise<void> {
    await Promise.all(
      images.map((image) =>
        this.s3.putObjectParalleUp({
          Bucket: bucket,
          Key: image.getAttributes().id,
          Body: image.getAttributes().content,
          ContentType: image.getAttributes().mimetype,
        }),
      ),
    );
  }

  async persistenceImage(
    image: ImageProcessing,
    bucket = this.bucketImagesConvert,
  ): Promise<void> {
    await this.s3.putObjectParalleUp({
      Bucket: bucket,
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
