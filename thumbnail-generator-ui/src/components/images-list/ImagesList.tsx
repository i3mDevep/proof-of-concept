import List from "@mui/material/List";
import { observer } from "mobx-react-lite";
import { ImageItem } from "./ImageItem";
import { useRootStore } from "../../provider/root-store";

const ORIGINAL_TAG = "original";

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
        overflowX: 'hidden',
        scrollbarWidth: 'thin'
      }}
    >
      {Object.entries(imagesStore.storeImagesAgroupById).map(([id, values]) => {
        const original = values.find((v) => v.url.includes(ORIGINAL_TAG));
        if (!original?.url) return null;
        return (
          <ImageItem
            key={id}
            id={id}
            urlOriginal={original.url}
            otherSizes={values
              .filter((v) => !v.url.includes(ORIGINAL_TAG))
              .map((vf) => vf.url)}
          />
        );
      })}
    </List>
  );
});
