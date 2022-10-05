import { Alert, Snackbar } from "@mui/material";
import { observer } from "mobx-react-lite";
import { RootStore } from "../../store/root.store";

export const NotificationSaved = observer(
  ({ rootStore }: { rootStore: RootStore }) => {
    return (
      <Snackbar
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
        open={rootStore.imagesStore.sendFileToServerSuccess}
        autoHideDuration={6000}
        onClose={() => rootStore.imagesStore.resetSendFileToServerSuccess()}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Your image is being processed, this may take a few seconds
        </Alert>
      </Snackbar>
    );
  }
);
