// client/src/components/documents/DocumentUpload.js
import React, { useState } from 'react';
import { uploadDocument } from '../../utils/api';

const DocumentUpload = ({ caseId }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('document', file);

    setLoading(true);

    try {
      await uploadDocument(caseId, formData);
      alert('Document uploaded successfully!');
      // Reload the documents list or refresh state as needed
    } catch (error) {
      console.error('Error uploading document:', error);
      alert('Failed to upload document.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Upload Document</h3>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit" disabled={loading}>
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    </div>
  );
};

export default DocumentUpload;