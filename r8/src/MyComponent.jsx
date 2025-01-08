import React, { useState } from "react";
import { FaFilePdf, FaFileWord, FaFileExcel, FaFileAlt } from "react-icons/fa"; // Example using react-icons

const fileTypeIcons = {
  pdf: <FaFilePdf />,
  doc: <FaFileWord />,
  docx: <FaFileWord />,
  xls: <FaFileExcel />,
  xlsx: <FaFileExcel />,
  txt: <FaFileAlt />,
  // Add more mappings as needed
};

function MyComponent() {
  const [preview, setPreview] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [documentIcon, setDocumentIcon] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setFileType(file.type.split("/")[0]);

      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else if (file.type.startsWith("video/")) {
        setPreview(URL.createObjectURL(file));
      } else if (file.type.startsWith("application/")) {
        setPreview(file.name);
        const fileExtension = file.name.split(".").pop().toLowerCase();
        setDocumentIcon(fileTypeIcons[fileExtension] || <FaFileAlt />); // Default icon
      } else {
        setPreview(null);
      }
    } else {
      setPreview(null);
      setFileType(null);
      setDocumentIcon(null);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {fileType === "image" && preview && (
        <img src={preview} alt="Image Preview" style={{ maxWidth: "200px" }} />
      )}
      {fileType === "video" && preview && (
        <video src={preview} controls width="200" />
      )}
      {fileType === "application" && documentIcon && (
        <div>
          {documentIcon}
          <p>Document: {preview}</p>
        </div>
      )}
    </div>
  );
}

export default MyComponent;
