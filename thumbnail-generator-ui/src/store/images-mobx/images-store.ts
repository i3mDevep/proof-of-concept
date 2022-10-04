import { makeAutoObservable, runInAction } from "mobx";
import { ImageRecordedDomain } from "./images-recorded-domain";

export class ImagesStore {
  storedImages: ImageRecordedDomain[] = [];
  storeImagesAgroupById: Record<string, ImageRecordedDomain[]> = {};
  isLoading = true;
  urlApi: string;

  constructor(urlApi: string) {
    makeAutoObservable(this, {
      urlApi: false,
    });
    this.urlApi = urlApi;
    this.loadImages();
  }

  async loadImages() {
    this.isLoading = true;
    const response = await fetch(this.urlApi);
    const fetchImagesList = await response.json();
    runInAction(() => {
      fetchImagesList.message.forEach((images: string) =>
        this.updateImagesFromServer(images)
      );
      this.isLoading = false;
    });
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
