import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  getCaseDetails, 
  getDocuments, 
  updateCaseStatus,
  getClientDetails
} from '../../utils/api';
import { generateCaseReport } from '../../utils/pdfGenerator';
import DocumentUpload from '../documents/DocumentUpload';
import { 
  BriefcaseIcon, 
  UserIcon,
  DocumentIcon,
  CalendarIcon,
  ArrowLeftIcon,
  CheckIcon,
  PencilSquareIcon,
  DocumentArrowDownIcon,
  ExclamationCircleIcon 
} from "@heroicons/react/24/outline";

const CaseDetail = () => {
  const { caseId } = useParams();
  const [caseData, setCaseData] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [clientData, setClientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [caseDetails, caseDocuments] = await Promise.all([
          getCaseDetails(caseId),
          getDocuments(caseId)
        ]);
        
        setCaseData(caseDetails);
        setDocuments(caseDocuments);
        
        if (caseDetails.client_id) {
          const client = await getClientDetails(caseDetails.client_id);
          setClientData(client);
        }
        setError(null);
      } catch (err) {
        console.error('Failed to fetch data:', err);
        setError("Failed to load case details. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [caseId]);

  const handleStatusUpdate = async (newStatus) => {
    try {
      await updateCaseStatus(caseId, newStatus);
      setCaseData({...caseData, case_status: newStatus});
    } catch (err) {
      console.error('Failed to update status:', err);
      setError("Failed to update case status. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-slate-200 h-12 w-12"></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-slate-200 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-slate-200 rounded"></div>
              <div className="h-4 bg-slate-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
        <p className="font-medium">{error}</p>
      </div>
    );
  }

  if (!caseData) {
    return (
      <div className="bg-amber-50 border border-amber-200 text-amber-700 px-6 py-4 rounded-lg">
        <p className="font-medium">No case found with this ID.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-50">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white p-8 rounded-xl shadow-md mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center">
            <div className="p-2 bg-white/10 backdrop-blur-sm rounded-lg mr-4">
              <BriefcaseIcon className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{caseData.case_name}</h1>
              <p className="text-slate-300 mt-1">Case #{caseData.id}</p>
            </div>
          </div>
          <div className="flex space-x-3 mt-4 md:mt-0">
            <Link
              to={`/cases/${caseData.id}/edit`}
              className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-sm"
            >
              <PencilSquareIcon className="w-5 h-5 mr-2" />
              Edit Case
            </Link>
            <Link
              to="/cases"
              className="flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-lg transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Back to Cases
            </Link>
          </div>
        </div>
      </div>

      {/* Case Information Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Case Details */}
        <div className="bg-white rounded-xl shadow-md border border-slate-100 p-6 transition-all hover:shadow-lg">
          <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
            <BriefcaseIcon className="w-5 h-5 mr-2 text-blue-500" />
            Case Details
          </h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg mr-3">
                <DocumentIcon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Case Type</p>
                <p className="text-slate-800 font-medium">{caseData.case_type}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className={`p-2 ${caseData.case_status === 'completed' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'} rounded-lg mr-3`}>
                <CheckIcon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Status</p>
                <p className="text-slate-800 font-medium capitalize">{caseData.case_status}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="p-2 bg-purple-50 text-purple-600 rounded-lg mr-3">
                <CalendarIcon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Next Hearing Date</p>
                <p className="text-slate-800 font-medium">
                  {caseData.next_hearing_date ? new Date(caseData.next_hearing_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }) : 'Not scheduled'}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-3">
              <button
                className={`px-4 py-2 rounded-lg font-medium flex items-center ${
                  caseData.case_status === 'ongoing' 
                    ? 'bg-slate-100 text-slate-500 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white transition-colors'
                }`}
                onClick={() => handleStatusUpdate('ongoing')}
                disabled={caseData.case_status === 'ongoing'}
              >
                Mark as Ongoing
              </button>
              <button
                className={`px-4 py-2 rounded-lg font-medium flex items-center ${
                  caseData.case_status === 'completed' 
                    ? 'bg-slate-100 text-slate-500 cursor-not-allowed' 
                    : 'bg-green-600 hover:bg-green-700 text-white transition-colors'
                }`}
                onClick={() => handleStatusUpdate('completed')}
                disabled={caseData.case_status === 'completed'}
              >
                Mark as Completed
              </button>
            </div>
          </div>
        </div>
        
        {/* Client Information */}
        <div className="bg-white rounded-xl shadow-md border border-slate-100 p-6 transition-all hover:shadow-lg">
          <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
            <UserIcon className="w-5 h-5 mr-2 text-indigo-500" />
            Client Information
          </h3>
          {clientData ? (
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg mr-3">
                  <UserIcon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">Client Name</p>
                  <p className="text-slate-800 font-medium">{clientData.name}</p>
                </div>
              </div>
              
              {clientData.email && (
                <div className="flex items-start">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">Email</p>
                    <p className="text-slate-800 font-medium">{clientData.email}</p>
                  </div>
                </div>
              )}
              
              {clientData.phone && (
                <div className="flex items-start">
                  <div className="p-2 bg-green-50 text-green-600 rounded-lg mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">Phone</p>
                    <p className="text-slate-800 font-medium">{clientData.phone}</p>
                  </div>
                </div>
              )}
              
              <div className="pt-2">
                <Link 
                  to={`/clients/${clientData.id}`}
                  className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                >
                  View Client Profile
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </Link>
              </div>
            </div>
          ) : (
            <div className="text-slate-500">No client information available</div>
          )}
        </div>
      </div>
      
      {/* Documents Section */}
      <div className="bg-white rounded-xl shadow-md border border-slate-100 p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-800 flex items-center">
            <DocumentIcon className="w-5 h-5 mr-2 text-blue-500" />
            Case Documents
          </h3>
          <button
            onClick={() => generateCaseReport(caseData, documents)}
            className="flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors shadow-sm"
          >
            <DocumentArrowDownIcon className="w-5 h-5 mr-2" />
            Generate Report
          </button>
        </div>
        
        <DocumentUpload />
        
        {documents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center text-slate-500">
            <div className="p-4 bg-slate-50 rounded-full mb-4">
              <DocumentIcon className="w-8 h-8 text-slate-400" />
            </div>
            <p className="font-medium text-slate-600">No documents uploaded yet</p>
            <p className="text-sm text-slate-400 mt-1">Upload documents using the form above</p>
          </div>
        ) : (
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <ul className="divide-y divide-slate-200">
              {documents.map((document) => (
                <li key={document.id} className="flex items-center justify-between p-4 hover:bg-slate-50">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                      <DocumentIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">{document.name}</p>
                      <p className="text-sm text-slate-500">{document.description || 'No description'}</p>
                    </div>
                  </div>
                  <a 
                    href={document.file_path} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors text-sm font-medium"
                  >
                    View
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default CaseDetail;