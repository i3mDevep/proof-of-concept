import { ImagesStore } from "./images-mobx/images-store";

export class RootStore {
  public imagesStore: ImagesStore;
  constructor() {
    this.imagesStore = new ImagesStore(
      "https://a6ffvv8t36.execute-api.us-east-1.amazonaws.com/prod/image"
    );
  }
}
