import { makeAutoObservable } from "mobx";
import { ImagesStore } from "./images-store";

export class ImageRecordedDomain {
  url: string;
  store: ImagesStore;
  constructor(store: ImagesStore, url: string) {
    makeAutoObservable(this, {
      store: false,
    });
    this.url = url;
    this.store = store;
  }
}
