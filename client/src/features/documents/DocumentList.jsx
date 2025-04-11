import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../utils/api";

const DocumentList = () => {
  const { caseId } = useParams();
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      const res = await axios.get(`/cases/${caseId}/documents`);
      setDocuments(res.data);
    };
    fetchDocuments();
  }, [caseId]);

  const handleDelete = async (docId) => {
    await axios.delete(`/documents/${docId}`);
    setDocuments(documents.filter((doc) => doc.id !== docId));
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Documents</h3>
      <div className="bg-white shadow rounded overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">File Name</th>
              <th className="p-3 text-left">Uploaded On</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => (
              <tr key={doc.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{doc.filename}</td>
                <td className="p-3">{new Date(doc.created_at).toLocaleDateString()}</td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => handleDelete(doc.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {documents.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center p-4 text-gray-500">
                  No documents uploaded.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DocumentList;
