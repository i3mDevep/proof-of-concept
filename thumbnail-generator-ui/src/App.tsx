import { useEffect, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import reactLogo from './assets/react.svg';
import './App.css';

const fileTypes = ['JPG', 'PNG'];

const convertToBase64 = (file: Blob) => new Promise((resolve, reject) => {
  const fileReader = new FileReader();
  fileReader.readAsDataURL(file);
  fileReader.onload = () => {
    resolve(fileReader.result);
  };
  fileReader.onerror = (error) => {
    reject(error);
  };
});

function App() {
  const [count, setCount] = useState(0);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState<string>('');
  useEffect(() => {
    if (!file) return;
    convertToBase64(file).then((url) => setPreview(url as string));
  }, [file]);

  const handleChange = (value: any) => {
    setFile(value);
  };
  console.log({ file, preview });
  return (
    <div className="App">
      <div>
        <FileUploader multiple={false} handleChange={handleChange} name="file" types={fileTypes} />
        <img alt="" src={preview} />
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button type="button" onClick={() => setCount((p) => p + 1)}>
          count is
          {' '}
          {count}
        </button>
        <p>
          Edit
          {' '}
          <code>src/App.tsx</code>
          {' '}
          and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
