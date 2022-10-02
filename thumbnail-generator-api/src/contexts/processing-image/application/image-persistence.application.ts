import { ImageProcessing } from '../domain/image.aggregate-root';
import { ImageRepository } from '../domain/image.repository';

export class ImagePersistence {
  constructor(private operations: ImageRepository) {}

  public persistenceImage = async (image: ImageProcessing) => {
    await this.operations.persistenceImage(image);
  };
}
