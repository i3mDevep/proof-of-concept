import { autorun, makeAutoObservable } from "mobx";
import { ImagesStore } from "./images-store";

export class ImageFileDomain {
  file: Blob;
  dataBase64: string | ArrayBuffer | null = null;
  error: ProgressEvent<FileReader> | null = null;
  convertToBase64: any = null;
  uploadingServer = false;
  store: ImagesStore;
  constructor(store: ImagesStore, file: Blob) {
    makeAutoObservable(this, {
      store: false,
    });
    this.file = file;
    this.store = store;

    this.convertToBase64 = autorun(() => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        this.dataBase64 = fileReader.result;
      };
      fileReader.onerror = (error) => {
        this.error = error;
      };
    });
  }

  dispose() {
    this.convertToBase64();
  }
}
