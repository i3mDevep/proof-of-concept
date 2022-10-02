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
}
