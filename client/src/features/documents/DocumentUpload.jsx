// DocumentUpload.jsx
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../utils/api";
import { DocumentArrowUpIcon, LockClosedIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";

const DocumentUpload = () => {
  const { id, caseId } = useParams();
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [description, setDescription] = useState("");
  const [filingDate, setFilingDate] = useState("");
  const [isConfidential, setIsConfidential] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
 
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError("");
    }
  };

  const handleUpload = async () => {
    if (!file || !title || !documentType) { 
      setError("Please fill in all required fields");
      return;
    }

    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append("document", file);
    formData.append("title", title);
    formData.append("document_type", documentType);
    formData.append("description", description);
    formData.append("filing_date", filingDate);
    formData.append("is_confidential", isConfidential);
    formData.append("uploaded_by", 1); // To change

    try {
      setLoading(true);
      setError("");
      
      await axios.post(`/docs/api/cases/${caseId}/documents`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      // Reset form fields
      setFile(null);
      setTitle("");
      setDocumentType("");
      setDescription("");
      setFilingDate("");
      setIsConfidential(false);
      
      // Show success message
      setSuccess("Document uploaded successfully!");
      setTimeout(() => setSuccess(""), 5000);
      
    } catch (err) {
      console.error("Error uploading document", err);
      setError("Failed to upload document. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const documentTypes = [
    "Pleading",
    "Motion",
    "Brief",
    "Exhibit",
    "Transcript",
    "Order",
    "Notice",
    "Affidavit",
    "Contract",
    "Other"
  ];
  
  return (
    <div className="bg-white rounded-xl shadow-md border border-slate-100 p-6 mt-6">
      <div className="flex items-center mb-6">
        <span className="p-2 bg-blue-50 text-blue-600 rounded-lg mr-3">
          <DocumentArrowUpIcon className="w-5 h-5" />
        </span>
        <h3 className="text-xl font-bold text-slate-800">Upload New Document</h3>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-lg flex items-center text-red-700 text-sm">
          <ExclamationCircleIcon className="w-5 h-5 mr-2" />
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-50 border border-green-100 rounded-lg flex items-center text-green-700 text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          {success}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Document Title *</label>
          <input
            type="text"
            placeholder="Enter document title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Document Type *</label>
          <select
            value={documentType}
            onChange={(e) => setDocumentType(e.target.value)}
            className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          >
            <option value="">Select Type</option>
            {documentTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
        <textarea
          placeholder="Enter document description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
          className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Filing Date</label>
          <input
            type="date"
            value={filingDate}
            onChange={(e) => setFilingDate(e.target.value)}
            className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
        </div>

        <div className="flex items-center">
          <div className="flex h-full items-center mt-6">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isConfidential}
                onChange={(e) => setIsConfidential(e.target.checked)}
                className="sr-only peer"
              />
              <div className="relative w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              <div className="flex items-center ml-3">
                <LockClosedIcon className="w-4 h-4 mr-1 text-slate-500" />
                <span className="text-sm font-medium text-slate-700">Mark as Confidential</span>
              </div>
            </label>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700 mb-1">Document File *</label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-lg">
          <div className="space-y-1 text-center">
            <svg className="mx-auto h-12 w-12 text-slate-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="flex text-sm text-slate-600">
              <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                <span>Upload a file</span>
                <input 
                  id="file-upload" 
                  name="file-upload" 
                  type="file" 
                  className="sr-only" 
                  onChange={handleFileChange}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-slate-500">
              PDF, DOC, DOCX up to 10MB
            </p>
          </div>
        </div>
        {file && (
          <div className="mt-2 flex items-center text-sm text-slate-600">
            <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-slate-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clipRule="evenodd" />
            </svg>
            {file.name}
          </div>
        )}
      </div>

      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-slate-700 bg-slate-100 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-all mr-3"
        >
          Cancel
        </button>
        <button
          onClick={handleUpload}
          disabled={loading || !file || !title || !documentType}
          className={`flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white ${
            loading || !file || !title || !documentType
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          } transition-all`}
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Uploading...
            </>
          ) : (
            <>Upload Document</>
          )}
        </button>
      </div>
    </div>
  );
};

export default DocumentUpload;