import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../utils/api";

const DocumentUpload = () => {
  const { id, caseId } = useParams();
  console.log("Params:", { id, caseId });
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [description, setDescription] = useState("");
  const [filingDate, setFilingDate] = useState("");
  const [isConfidential, setIsConfidential] = useState(false);
  const [loading, setLoading] = useState(false);
 
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
// Handles form submission (upload)
  const handleUpload = async () => {
    if (!file || !title || !documentType) { 
      alert("Please select a file and provide title and document type");
      return;
    }

    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append("document", file); // Changed from "file" to "document"
    formData.append("title", title);
    formData.append("document_type", documentType);
    formData.append("description", description);
    formData.append("filing_date", filingDate);
    formData.append("is_confidential", isConfidential);
    formData.append("uploaded_by", 1); //To change

    try {
      setLoading(true);
      await axios.post(`/docs/api/cases/${caseId}/documents`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      setFile(null);
      setTitle("");
      setDocumentType("");
      setDescription("");
      setFilingDate("");
      setIsConfidential(false);
      alert("Document uploaded successfully!");
    } catch (err) {
      // commit: Handle upload error
      console.error("Error uploading document", err);
      alert("Failed to upload document");
    } finally {
      // commit: Reset loading state
      setLoading(false);
    }
  };
  
  return (
    <div className="space-y-4 p-4 bg-white shadow rounded">
      <h3 className="text-xl font-semibold">Upload Document</h3>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 rounded"
      />

      <input
        type="text"
        placeholder="Document Type"
        value={documentType}
        onChange={(e) => setDocumentType(e.target.value)}
        className="w-full border p-2 rounded"
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border p-2 rounded"
      />

      <input
        type="date"
        value={filingDate}
        onChange={(e) => setFilingDate(e.target.value)}
        className="w-full border p-2 rounded"
      />

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={isConfidential}
          onChange={(e) => setIsConfidential(e.target.checked)}
        />
        Mark as Confidential
      </label>

      <input
        type="file"
        onChange={handleFileChange}
        className="w-full border p-2 rounded"
      />

      <div className="flex gap-4 mt-4">
        <button
          onClick={handleUpload}
          disabled={loading || !file || !title || !documentType}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Uploading..." : "Upload Document"}
        </button>
        {file && <span className="text-gray-600">{file.name}</span>}
      </div>
    </div>
  );
};

export default DocumentUpload;
