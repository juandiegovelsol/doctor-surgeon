// src/components/DragAndDrop.jsx
import React, { useCallback } from "react";
import "./DragAndDrop.scss";

function DragAndDrop({ onImageDropped }) {
  const handleDragOver = useCallback((event) => {
    event.preventDefault();
  }, []);

  const handleDrop = useCallback(
    (event) => {
      event.preventDefault();
      const files = event.dataTransfer.files;
      if (files.length > 0 && files[0].type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          onImageDropped(e.target.result);
        };
        reader.readAsDataURL(files[0]);
      }
    },
    [onImageDropped]
  );

  return (
    <div
      className="drag-and-drop-container"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <p>Drag and drop an image here</p>
      <p>or click to select</p>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
              onImageDropped(event.target.result);
            };
            reader.readAsDataURL(e.target.files[0]);
          }
        }}
        style={{ display: "none" }}
        id="file-upload"
      />
      <label htmlFor="file-upload" className="upload-button">
        Select Image
      </label>
    </div>
  );
}

export default DragAndDrop;
