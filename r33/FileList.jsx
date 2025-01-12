import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import IconButton from "@mui/material/IconButton";
import DownloadIcon from "@mui/icons-material/Download";
import Typography from "@mui/material/Typography";

function FileList() {
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch("/api/get-materials"); // Replace with your backend API endpoint
        if (response.ok) {
          const data = await response.json();
          setFileList(data);
        } else {
          console.error("Failed to fetch file list");
        }
      } catch (error) {
        console.error("Error fetching file list:", error);
      }
    };

    fetchFiles();
  }, []);

  const handleDownload = (filename) => {
    // Option 1: Navigate to the download URL (simplest)
    window.location.href = `/api/download-material/${filename}`; // Replace with your backend API endpoint

    // Option 2: Fetch the file as a Blob and trigger download (more control)
    // fetch(`/api/download-material/${filename}`)
    //   .then(response => response.blob())
    //   .then(blob => {
    //     const url = window.URL.createObjectURL(new Blob([blob]));
    //     const link = document.createElement('a');
    //     link.href = url;
    //     link.setAttribute('download', filename);
    //     document.body.appendChild(link);
    //     link.click();
    //     link.parentNode.removeChild(link);
    //   });
  };

  if (fileList.length === 0) {
    return <Typography variant="body1">No materials available yet.</Typography>;
  }

  return (
    <List>
      {fileList.map((file) => (
        <ListItem key={file.filename} divider>
          <ListItemText primary={file.filename} />
          <ListItemSecondaryAction>
            <IconButton
              edge="end"
              aria-label="download"
              onClick={() => handleDownload(file.filename)}
            >
              <DownloadIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
}

export default FileList;
