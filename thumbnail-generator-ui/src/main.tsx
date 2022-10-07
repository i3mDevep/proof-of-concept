import ReactDOM from "react-dom/client";
import { RootStoreProvider } from "./provider/root-store";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import App from "./App";
import "./index.css";
import { darkTheme } from "./theme";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RootStoreProvider>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </RootStoreProvider>
);
