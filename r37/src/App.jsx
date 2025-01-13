// src/App.jsx
import React, { useState } from "react";
import DragAndDrop from "./components/DragAndDrop";
import ImagePreview from "./components/ImagePreview";
import "./App.scss";

function App() {
  const [previewImage, setPreviewImage] = useState(null);

  return (
    <div className="app-container">
      <ImagePreview previewImage={previewImage} />
      <DragAndDrop onImageDropped={setPreviewImage} />
    </div>
  );
}

export default App;
