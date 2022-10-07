import { ImagesList } from "./components/images-list";
import { SinapsisLogo } from "./components/sinapsis-logo";
import { UploadImage } from "./components/upload-image";

import "./App.css";

const App = () => {
  return (
    <div className="wrapper-app">
      <header className="main-head">
        <SinapsisLogo color="#ffff" />
      </header>
      <div className="content-upload">
        <UploadImage />
      </div>
      <div className="list-images">
        <ImagesList />
      </div>
    </div>
  );
};

export default App;
