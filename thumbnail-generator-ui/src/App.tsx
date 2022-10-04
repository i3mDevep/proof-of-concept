import { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { observer } from "mobx-react-lite";

import "./App.css";
import { useRootStore } from "./provider/root-store";
import { ImagesList } from "./components/ImagesList";
import { Preview } from "./components/UploadImage/Preview";
import { Box } from "@mui/material";
import { SinapsisHeader } from "./components/SinapsisHeader";

const fileTypes = ["JPG", "PNG"];

const convertToBase64 = (file: Blob) =>
  new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });

const App = observer(() => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState<string>("");
  const rootStore = useRootStore();

  useEffect(() => {
    if (!file) return;
    convertToBase64(file).then((url) => setPreview(url as string));
  }, [file]);

  const handleChange = (value: any) => {
    setFile(value);
  };

  return (
    <div className="App">
      <SinapsisHeader color="#ffff" />
      <div>
        <FileUploader
          multiple={false}
          handleChange={handleChange}
          name="file"
          types={fileTypes}
        />
        <Box sx={{ marginTop: 3 }}>
          <Preview src={preview} />
        </Box>
      </div>
      <ImagesList />
    </div>
  );
});

export default App;
