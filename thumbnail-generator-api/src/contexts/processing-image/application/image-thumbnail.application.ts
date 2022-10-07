import { ImageProcessing } from '../domain/image.aggregate-root';
import { ImageRepository } from '../domain/image.repository';
import { ThumbnailServices } from '../domain/thumbnail.services';

export class ImageThumbnail {
  constructor(private operations: ImageRepository) {}

  public thumbnailImages = async (imageId: string) => {
    const dimensions = [
      { width: 400, heigth: 300 },
      { width: 160, heigth: 120 },
      { width: 120, heigth: 120 },
    ];
    const imageOriginal = await this.operations.getImageById(imageId);

    const imagesResizes = await Promise.all(
      dimensions.map((dimension) =>
        ThumbnailServices.thumbnailImage({
          image: imageOriginal.getAttributes().content,
          ...dimension,
        }),
      ),
    );

    const imageResizePreview = await ThumbnailServices.thumbnailImage({
      image: imageOriginal.getAttributes().content,
      heigth: 120,
      width: ThumbnailServices.getMeasureLinear(),
    });

    const imageCopyOriginal = new ImageProcessing({
      ...imageOriginal.getAttributes(),
      id: ThumbnailServices.renameImage({
        origin: imageOriginal.getAttributes().id,
        custom: 'original',
      }),
    });

    const imagePreview = new ImageProcessing({
      ...imageOriginal.getAttributes(),
      content: imageResizePreview.imagesResize,
      id: ThumbnailServices.renameImage({
        origin: imageOriginal.getAttributes().id,
        custom: 'preview',
      }),
    });

    await this.operations.persistenceBatchImages([
      imagePreview,
      imageCopyOriginal,
      ...imagesResizes.map(
        (iresize) =>
          new ImageProcessing({
            ...imageOriginal.getAttributes(),
            id: ThumbnailServices.renameImage({
              origin: imageOriginal.getAttributes().id,
              ...iresize,
            }),
            content: iresize.imagesResize,
          }),
      ),
    ]);
  };
}
