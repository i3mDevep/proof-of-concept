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

    await this.operations.persistenceBatchImages([
      new ImageProcessing({
        ...imageOriginal.getAttributes(),
        id: ImageThumbnail.renameImage({
          origin: imageOriginal.getAttributes().id,
          custom: 'original',
        }),
      }),
      ...imagesResizes.map(
        (iresize) =>
          new ImageProcessing({
            ...imageOriginal.getAttributes(),
            id: ImageThumbnail.renameImage({
              origin: imageOriginal.getAttributes().id,
              ...iresize,
            }),
            content: iresize.imagesResize,
          }),
      ),
    ]);
  };

  private static renameImage = ({
    origin,
    width,
    heigth,
    custom,
  }: {
    origin: string;
    width?: number;
    heigth?: number;
    custom?: string;
  }) => {
    const nameImage = custom || `${width}X${heigth}`;
    return `${origin.split('.')[0]}/${nameImage}.${origin.split('.')[1]}`;
  };
}
