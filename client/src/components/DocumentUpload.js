import React, { useState } from 'react';
import { TextField, Button, CircularProgress } from '@mui/material';
import axios from 'axios';

const DocumentUpload = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [filePreview, setFilePreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Handle file selection and preview
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);

      // If it's a PDF, show a preview
      if (selectedFile.type === 'application/pdf') {
        const fileReader = new FileReader();
        fileReader.onload = function(event) {
          setFilePreview(event.target.result);
        };
        fileReader.readAsDataURL(selectedFile);
      }
    }
  };

  // Handle file upload
  const handleUpload = () => {
    if (!file) return;
    setUploading(true);
    
    const formData = new FormData();
    formData.append('file', file);
    
    axios.post('/api/cases/1/documents', formData) // Assuming case ID is 1
      .then(response => {
        setUploading(false);
        alert('Document uploaded successfully');
      })
      .catch(error => {
        console.error('Error uploading document:', error);
        setUploading(false);
      });
  };

  return (
    <div>
      <TextField
        type="file"
        onChange={handleFileChange}
        variant="outlined"
        fullWidth
        margin="normal"
      />
      {file && <p>Selected File: {fileName}</p>}
      {filePreview && <iframe src={filePreview} width="100%" height="400px" />}
      <Button
        onClick={handleUpload}
        variant="contained"
        color="primary"
        disabled={uploading}
      >
        {uploading ? <CircularProgress size={24} /> : 'Upload Document'}
      </Button>
    </div>
  );
};

export default DocumentUpload;
