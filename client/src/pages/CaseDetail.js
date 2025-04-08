// client/src/components/cases/CaseDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCaseDetails, getDocuments } from '../../utils/api';

const CaseDetail = () => {
  const { caseId } = useParams(); // Get the caseId from URL parameters
  const [caseData, setCaseData] = useState(null);
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const caseDetails = await getCaseDetails(caseId);
        setCaseData(caseDetails);

        const caseDocuments = await getDocuments(caseId);
        setDocuments(caseDocuments);
      } catch (error) {
        console.error('Failed to fetch case details or documents:', error);
      }
    };
    fetchData();
  }, [caseId]);

  if (!caseData) return <div>Loading...</div>;

  return (
    <div>
      <h1>{caseData.case_name}</h1>
      <p>Case Type: {caseData.case_type}</p>
      <p>Status: {caseData.case_status}</p>
      <p>Next Hearing: {caseData.next_hearing_date}</p>

      <h2>Documents</h2>
      <ul>
        {documents.length === 0 ? (
          <p>No documents uploaded.</p>
        ) : (
          documents.map((document) => (
            <li key={document.id}>
              <a href={document.file_path} target="_blank" rel="noopener noreferrer">
                {document.name}
              </a>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default CaseDetail;