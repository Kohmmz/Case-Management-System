import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../utils/api";

const DocumentUpload = () => {
  const { caseId } = useParams();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("document", file);

    try {
      setLoading(true);
      await axios.post(`/cases/${caseId}/documents`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setFile(null);
      alert("Document uploaded successfully!");
    } catch (err) {
      console.error("Error uploading document", err);
      alert("Failed to upload document");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Upload Document</h3>
      <input
        type="file"
        onChange={handleFileChange}
        className="w-full border p-2 rounded"
      />
      <div className="flex gap-4 mt-4">
        <button
          onClick={handleUpload}
          disabled={loading || !file}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
        {file && (
          <span className="text-gray-600">{file.name}</span>
        )}
      </div>
    </div>
  );
};

export default DocumentUpload;