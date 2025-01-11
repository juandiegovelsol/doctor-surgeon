import React, { useState } from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus({
        open: true,
        message: "Please select a file.",
        severity: "warning",
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    // You can append additional data like course ID, etc.
    // formData.append('courseId', 'your-course-id');

    try {
      const response = await fetch("/api/upload-material", {
        // Replace with your backend API endpoint
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setUploadStatus({
          open: true,
          message: "File uploaded successfully!",
          severity: "success",
        });
        setSelectedFile(null); // Reset file selection
      } else {
        const errorData = await response.json();
        setUploadStatus({
          open: true,
          message: `Upload failed: ${errorData.message || response.statusText}`,
          severity: "error",
        });
      }
    } catch (error) {
      setUploadStatus({
        open: true,
        message: `Upload failed: ${error.message}`,
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setUploadStatus({ ...uploadStatus, open: false });
  };

  return (
    <div>
      <input type="file" id="file-upload" hidden onChange={handleFileChange} />
      <label htmlFor="file-upload">
        <Button
          component="span"
          variant="contained"
          startIcon={<CloudUploadIcon />}
        >
          Upload Material
        </Button>
      </label>
      {selectedFile && (
        <Typography variant="subtitle2" style={{ marginTop: 8 }}>
          Selected file: {selectedFile.name}
        </Typography>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        disabled={!selectedFile}
        style={{ marginLeft: 16 }}
      >
        Submit
      </Button>
      <Snackbar
        open={uploadStatus.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={uploadStatus.severity}
          sx={{ width: "100%" }}
        >
          {uploadStatus.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default FileUpload;
