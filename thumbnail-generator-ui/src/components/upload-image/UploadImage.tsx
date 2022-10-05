import { Box } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { observer } from "mobx-react-lite";
import { FileUploader } from "react-drag-drop-files";
import { useRootStore } from "../../provider/root-store";
import { Preview } from "./Preview";
import { SaveImage } from "./SaveImage";
import { NotificationSaved } from "./NotificationSaved";

const fileTypes = ["JPG", "PNG"];

export const UploadImage = observer(() => {
  const rootStore = useRootStore();

  const handleChange = (file: Blob) => {
    rootStore.imagesStore.uploadFileImageThumbnail(file);
  };

  return (
    <>
      <FileUploader
        multiple={false}
        handleChange={handleChange}
        name="file"
        classes="custom_file_uploader"
        types={fileTypes}
      />
      <Box sx={{ marginTop: 3 }}>
        <Preview
          src={rootStore.imagesStore.imagenFileUpload?.dataBase64 as string}
        />
        <SaveImage rootStore={rootStore} />
        <NotificationSaved rootStore={rootStore} />
      </Box>
    </>
  );
});
