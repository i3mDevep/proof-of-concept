import { Alert, Snackbar } from "@mui/material";
import { observer } from "mobx-react-lite";
import { RootStore } from "../../store/root.store";

export const NotificationError = observer(
    ({ rootStore }: { rootStore: RootStore }) => {
      return (
        <Snackbar
          anchorOrigin={{ horizontal: "right", vertical: "top" }}
          open={!!rootStore.imagesStore.errorMessage}
          autoHideDuration={6000}
          onClose={() => rootStore.imagesStore.resetSendFileToServerSuccess()}
        >
          <Alert severity="error" sx={{ width: "100%" }}>
            {rootStore.imagesStore.errorMessage}
          </Alert>
        </Snackbar>
      );
    }
  );
  