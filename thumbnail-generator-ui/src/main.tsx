import ReactDOM from "react-dom/client";
import { RootStoreProvider } from "./provider/root-store";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import App from "./App";
import "./index.css";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: '#ffc901'
    }
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RootStoreProvider>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </RootStoreProvider>
);
