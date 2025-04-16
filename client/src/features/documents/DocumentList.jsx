import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../utils/api";
import { DocumentTextIcon, TrashIcon, EyeIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";

const DocumentList = () => {
const { id, caseId } = useParams();
const [documents, setDocuments] = useState([]);
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  if (!caseId) {
    console.error("caseId is undefined. Cannot fetch documents.");
    return;
}

const fetchDocuments = async () => {
  setIsLoading(true);
    try {
      const res = await axios.get(`/docs/api/documents/${caseId}/documents`);
      setDocuments(res.data);
    } catch (error) {
      console.error("Error fetching documents:", error);
    } finally {
      setIsLoading(false);
    }
  };

  fetchDocuments();
  }, [caseId]);

  const handleDelete = async (docId) => {
  try {
    await axios.delete(`/docs/api/documents/${docId}`);
    setDocuments(documents.filter((doc) => doc.id !== docId));
  } catch (error) {
    console.error("Error deleting document:", error);
  }
  };

  const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
  };

return (
  <div className="bg-white rounded-xl shadow-md border border-slate-100 p-6 transition-all">
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center">
        <span className="p-2 bg-indigo-50 text-indigo-600 rounded-lg mr-3">
          <DocumentTextIcon className="w-5 h-5" />
        </span>
        <h3 className="text-xl font-bold text-slate-800">Case Documents</h3>
      </div>
      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
        {documents.length} Documents
      </span>
    </div>
    
    {isLoading ? (
      <div className="animate-pulse flex flex-col space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-16 bg-slate-100 rounded-lg"></div>
        ))}
      </div>
    ) : (
      <>
        {documents.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs font-medium text-slate-500 uppercase bg-slate-50 rounded-lg">
                <tr>
                  <th className="px-4 py-3 rounded-l-lg">File Name</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Uploaded On</th>
                  <th className="px-4 py-3 rounded-r-lg text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {documents.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-4 font-medium text-slate-700">
                      {doc.original_file}
                    </td>
                    <td className="px-4 py-4 text-slate-600">
                      {doc.document_type || "Document"}
                      {doc.is_confidential && (
                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-50 text-red-700">
                          Confidential
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4 text-slate-600">
                      {formatDate(doc.created_at)}
                    </td>
                    <td className="px-4 py-4 text-right">
                      <div className="flex justify-end space-x-2">
                        <button className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors">
                          <EyeIcon className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors">
                          <ArrowDownTrayIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(doc.id)}
                          className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center text-slate-500 bg-slate-50 rounded-xl border border-dashed border-slate-200">
            <div className="p-4 bg-slate-100 rounded-full mb-4">
              <DocumentTextIcon className="w-8 h-8 text-slate-400" />
            </div>
            <p className="text-sm font-medium">No documents uploaded yet</p>
            <p className="text-xs text-slate-400 mt-1">Upload documents using the form below</p>
          </div>
        )}
      </>
    )}
  </div>
 );
};

export default DocumentList;