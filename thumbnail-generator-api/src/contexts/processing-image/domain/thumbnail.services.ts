import * as Jimp from 'jimp';

export class ThumbnailServices {
  static thumbnailImage = async ({
    image,
    width,
    heigth,
  }: {
    image: Buffer;
    width: number;
    heigth: number;
  }) => {
    const imageProcess = await Jimp.read(image);
    const imagesResize = await imageProcess
      .resize(width, heigth)
      .getBufferAsync(Jimp.MIME_PNG);
    return { imagesResize, width, heigth };
  };

  public static renameImage = ({
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

  static getMeasureLinear() {
    return Jimp.AUTO;
  }
}
