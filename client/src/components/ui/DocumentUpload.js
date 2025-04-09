import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { uploadDocument } from '../../utils/api';
import {
  Button,
  Box,
  Typography,
  LinearProgress,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper
} from '@mui/material';
import { CloudUpload } from '@mui/icons-material';

const DocumentUpload = () => {
  const { id } = useParams();
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const [docType, setDocType] = useState('other');
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/jpeg',
    'image/png'
  ];

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!allowedTypes.includes(selectedFile.type)) {
      setError('Invalid file type. Please upload PDF, Word, JPEG or PNG files.');
      return;
    }
    setFile(selectedFile);
    setError('');
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file.');
      return;
    }

    try {
      setProgress(0);
      setError('');
      
      const formData = new FormData();
      formData.append('file', file);
      formData.append('description', description);
      formData.append('type', docType);

      await uploadDocument(id, formData, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
        }
      });

      setSuccess('Document uploaded successfully!');
      setFile(null);
      setDescription('');
      setDocType('other');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to upload document');
      setProgress(0);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Upload New Document
      </Typography>
      
      <Box sx={{ mb: 2 }}>
        <Button
          variant="contained"
          component="label"
          startIcon={<CloudUpload />}
        >
          Select File
          <input
            type="file"
            hidden
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          />
        </Button>
        {file && (
          <Typography sx={{ ml: 2, display: 'inline' }}>
            {file.name}
          </Typography>
        )}
      </Box>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Document Type</InputLabel>
        <Select
          value={docType}
          label="Document Type"
          onChange={(e) => setDocType(e.target.value)}
        >
          <MenuItem value="pleading">Pleading</MenuItem>
          <MenuItem value="affidavit">Affidavit</MenuItem>
          <MenuItem value="evidence">Evidence</MenuItem>
          <MenuItem value="order">Court Order</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{ mb: 2 }}
      />

      {progress > 0 && (
        <Box sx={{ width: '100%', mb: 2 }}>
          <LinearProgress variant="determinate" value={progress} />
          <Typography variant="body2" align="center">
            {progress}%
          </Typography>
        </Box>
      )}

      <Button
        variant="contained"
        onClick={handleUpload}
        disabled={!file || progress > 0}
      >
        Upload Document
      </Button>

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
      {success && (
        <Typography color="success.main" sx={{ mt: 2 }}>
          {success}
        </Typography>
      )}
    </Paper>
  );
};

export default DocumentUpload;
