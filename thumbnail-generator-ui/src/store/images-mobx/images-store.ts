import axios from "axios";
import { autorun, makeAutoObservable, runInAction } from "mobx";
import { ImageFileDomain } from "./image-file-domain";
import { ImageRecordedDomain } from "./images-recorded-domain";

export class ImagesStore {
  storedImages: ImageRecordedDomain[] = [];
  storeImagesAgroupById: Record<string, ImageRecordedDomain[]> = {};
  imagenFileUpload: ImageFileDomain | null = null;
  isLoading = true;
  sendFileToServerSuccess = false;
  errorMessage = "";
  urlApi: string;

  constructor(urlApi: string) {
    makeAutoObservable(this, {
      urlApi: false,
    });
    this.urlApi = urlApi;
    this.loadImages();
    autorun(() => {
      if (this.sendFileToServerSuccess) {
        this.polling(5000, 10, () => this.loadImages());
      }
    });
  }

  polling(speed: number, maxLoop: number, callback: any, loopCount = 0) {
    setTimeout(() => {
      if (loopCount > maxLoop) return;
      callback();
      this.polling(speed, maxLoop, callback, (loopCount = loopCount + 1));
    }, speed);
  }

  async loadImages() {
    this.isLoading = true;
    const fetchImagesList = await axios.get(`${this.urlApi}/image`);
    runInAction(() => {
      fetchImagesList.data.message.forEach((images: string) =>
        this.updateImagesFromServer(images)
      );
      this.isLoading = false;
    });
  }

  resetSendFileToServerSuccess() {
    this.sendFileToServerSuccess = false;
    this.errorMessage = "";
  }

  async sendFileToServer() {
    if (!this.imagenFileUpload) return;
    this.imagenFileUpload.uploadingServer = true;
    try {
      await axios.post(`${this.urlApi}/image`, {
        imagen: this.imagenFileUpload.dataBase64,
      });
      this.sendFileToServerSuccess = true;
      this.errorMessage = "";
    } catch (error: any) {
      this.errorMessage = error?.response?.data?.message ?? "Error unknow";
      this.sendFileToServerSuccess = false;
    }
    this.imagenFileUpload.uploadingServer = false;
    runInAction(() => {
      this.imagenFileUpload?.dispose();
      this.imagenFileUpload = null;
    });
  }

  uploadFileImageThumbnail(file: Blob) {
    if (this.imagenFileUpload) {
      this.imagenFileUpload.dispose();
    }
    this.imagenFileUpload = new ImageFileDomain(this, file);
  }

  private updateImagesFromServer(url: string) {
    let imageRecorded = this.storedImages.find(
      (storedImage) => storedImage.url === url
    );
    if (!imageRecorded) {
      imageRecorded = new ImageRecordedDomain(this, url);
      this.assignedImageByKey(imageRecorded);
      this.storedImages.push(imageRecorded);
    }
  }

  private assignedImageByKey(image: ImageRecordedDomain) {
    const key = ImagesStore.getKeyImage(image.url);

    if (key) {
      const imagesOld = this.storeImagesAgroupById[key] ?? [];
      this.storeImagesAgroupById = {
        ...this.storeImagesAgroupById,
        [key]: [...imagesOld, image],
      };
    }
  }

  private static getKeyImage(url: string) {
    const pathname = new URL(url).pathname;
    const regexId = new RegExp("^[^/]*/[^/]*");
    return pathname.match(regexId)?.[0].replace("/", "");
  }
}
