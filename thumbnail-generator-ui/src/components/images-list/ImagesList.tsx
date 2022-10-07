import List from "@mui/material/List";
import { observer } from "mobx-react-lite";
import { ImageItem } from "./ImageItem";
import { useRootStore } from "../../provider/root-store";

const ORIGINAL_TAG = "original";
const PREVIEW_TAG = "preview";

export const ImagesList = observer(() => {
  const { imagesStore } = useRootStore();
  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
        maxHeight: 350,
        overflowY: "auto",
        overflowX: "hidden",
        scrollbarWidth: "thin",
      }}
    >
      {Object.entries(imagesStore.storeImagesAgroupById).map(([id, values]) => {

        const originalImage = values.find((v) => v.url.includes(ORIGINAL_TAG));
        const previewImage = values.find((v) => v.url.includes(PREVIEW_TAG));

        if (!originalImage?.url) return null;

        return (
          <ImageItem
            key={id}
            id={id}
            urlOriginal={originalImage.url}
            urlPreview={previewImage?.url}
            otherSizes={values
              .filter((v) => !v.url.includes(ORIGINAL_TAG) && !v.url.includes(PREVIEW_TAG))
              .map((vf) => vf.url)}
          />
        );
      })}
    </List>
  );
});
