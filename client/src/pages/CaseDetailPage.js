// client/src/pages/CaseDetailPage.js
import React from 'react';
import CaseDetail from '../components/cases/CaseDetail';
import DocumentUpload from '../components/documents/DocumentUpload';

const CaseDetailPage = ({ match }) => {
  const { caseId } = match.params;

  return (
    <div>
      <CaseDetail caseId={caseId} />
      <DocumentUpload caseId={caseId} />
    </div>
  );
};

export default CaseDetailPage;