// src/components/ImagePreview.jsx
import React from "react";
import "./ImagePreview.scss";

function ImagePreview({ previewImage }) {
  return (
    <div className="image-preview-container">
      {previewImage && (
        <img src={previewImage} alt="Preview" className="preview-image" />
      )}
      {!previewImage && <p>No image selected</p>}
    </div>
  );
}

export default ImagePreview;
