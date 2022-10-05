import { LoadingButton } from "@mui/lab";
import { observer } from "mobx-react-lite";
import { RootStore } from "../../store/root.store";

export const SaveImage = observer(({ rootStore }: { rootStore: RootStore }) => {
  return (
    <LoadingButton
      onClick={() => rootStore.imagesStore.sendFileToServer()}
      variant="outlined"
      disabled={!rootStore.imagesStore.imagenFileUpload?.dataBase64}
      sx={{ marginTop: 1, width: "100%" }}
      loading={!!rootStore.imagesStore.imagenFileUpload?.uploadingServer}
    >
      Save Image
    </LoadingButton>
  );
});
