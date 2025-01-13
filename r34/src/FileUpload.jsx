import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

function CourseMaterialManager() {
  const [folderStructure, setFolderStructure] = useState([]); // Data for the TreeView
  const [selectedFolder, setSelectedFolder] = useState(null); // ID of the currently selected folder
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [createFolderDialogOpen, setCreateFolderDialogOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");

  useEffect(() => {
    fetchFolderStructure();
  }, []);

  const fetchFolderStructure = async () => {
    try {
      const response = await fetch("/api/folders"); // Backend API to get the folder structure
      if (response.ok) {
        const data = await response.json();
        setFolderStructure(data);
      } else {
        console.error("Failed to fetch folder structure");
      }
    } catch (error) {
      console.error("Error fetching folder structure:", error);
    }
  };

  const handleNodeSelect = (event, nodeId) => {
    setSelectedFolder(nodeId);
  };

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
    if (!selectedFolder) {
      setUploadStatus({
        open: true,
        message: "Please select a folder to upload to.",
        severity: "warning",
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("folderId", selectedFolder); // Send the target folder ID

    try {
      const response = await fetch("/api/upload-material", {
        // Backend API for file upload
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setUploadStatus({
          open: true,
          message: "File uploaded successfully!",
          severity: "success",
        });
        setSelectedFile(null);
        fetchFolderStructure(); // Refresh the folder structure after upload
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

  const handleCreateFolderDialogOpen = () => {
    setCreateFolderDialogOpen(true);
  };

  const handleCreateFolderDialogClose = () => {
    setCreateFolderDialogOpen(false);
    setNewFolderName("");
  };

  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) {
      return;
    }

    try {
      const response = await fetch("/api/create-folder", {
        // Backend API to create a folder
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newFolderName,
          parentId: selectedFolder || null, // If no folder is selected, create at the root
        }),
      });

      if (response.ok) {
        setUploadStatus({
          open: true,
          message: "Folder created successfully!",
          severity: "success",
        });
        fetchFolderStructure(); // Refresh the folder structure
      } else {
        const errorData = await response.json();
        setUploadStatus({
          open: true,
          message: `Folder creation failed: ${
            errorData.message || response.statusText
          }`,
          severity: "error",
        });
      }
    } catch (error) {
      setUploadStatus({
        open: true,
        message: `Folder creation failed: ${error.message}`,
        severity: "error",
      });
    }

    handleCreateFolderDialogClose();
  };

  const renderTree = (nodes) => (
    <TreeItem
      key={nodes.id}
      nodeId={nodes.id}
      label={nodes.name}
      icon={
        nodes.type === "folder" ? (
          <FolderIcon color="primary" />
        ) : (
          <InsertDriveFileIcon />
        )
      }
    >
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setUploadStatus({ ...uploadStatus, open: false });
  };

  return (
    <div>
      <Button
        variant="outlined"
        startIcon={<CreateNewFolderIcon />}
        onClick={handleCreateFolderDialogOpen}
      >
        New Folder
      </Button>

      <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={"-"}
        defaultExpandIcon={"+"}
        onNodeSelect={handleNodeSelect}
        sx={{ mt: 2, mb: 2 }}
      >
        {folderStructure.map(renderTree)}
      </TreeView>

      <Typography variant="h6">Upload Material</Typography>
      {selectedFolder && (
        <Typography variant="subtitle2">
          Selected Folder: {selectedFolder}
        </Typography>
      )}
      <input type="file" id="file-upload" hidden onChange={handleFileChange} />
      <label htmlFor="file-upload">
        <Button
          component="span"
          variant="contained"
          startIcon={<CloudUploadIcon />}
        >
          Choose File
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
        disabled={!selectedFile || !selectedFolder}
        style={{ marginLeft: 16 }}
      >
        Upload to Folder
      </Button>

      <Dialog
        open={createFolderDialogOpen}
        onClose={handleCreateFolderDialogClose}
      >
        <DialogTitle>Create New Folder</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Folder Name"
            type="text"
            fullWidth
            variant="standard"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreateFolderDialogClose}>Cancel</Button>
          <Button onClick={handleCreateFolder}>Create</Button>
        </DialogActions>
      </Dialog>

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

export default CourseMaterialManager;
