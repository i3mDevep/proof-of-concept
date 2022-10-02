import { ImageProcessing } from './image.aggregate-root';

export interface ImageRepository {
  persistenceImage(image: ImageProcessing): Promise<void>;
  persistenceBatchImages(images: ImageProcessing[]): Promise<void>;
  getImageById(id: string): Promise<ImageProcessing>;
}
