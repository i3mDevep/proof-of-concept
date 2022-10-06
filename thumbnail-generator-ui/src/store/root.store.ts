import { ImagesStore } from "./images-mobx/images-store";

const { VITE_API_THUMBNAIL } = import.meta.env;

export class RootStore {
  public imagesStore: ImagesStore;
  constructor() {
    this.imagesStore = new ImagesStore(VITE_API_THUMBNAIL);
  }
}
