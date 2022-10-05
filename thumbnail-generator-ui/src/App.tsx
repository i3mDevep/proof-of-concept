import { ImagesList } from "./components/images-list";
import { SinapsisLogo } from "./components/sinapsis-logo";
import { UploadImage } from "./components/upload-image";

import "./App.css";

const App = () => {
  return (
    <div className="App">
      <SinapsisLogo color="#ffff" />
      <UploadImage />
      <ImagesList />
    </div>
  );
};

export default App;
