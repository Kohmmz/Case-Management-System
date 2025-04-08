// client/src/components/cases/CaseDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  getCaseDetails, 
  getDocuments, 
  updateCaseStatus,
  getClientDetails
} from '../../utils/api';
import { generateCaseReport } from '../../utils/pdfGenerator';
import DocumentUpload from '../components/DocumentUpload';
import { Box, Button, Card, Typography, List, ListItem, ListItemText } from '@mui/material';

const CaseDetail = () => {
  const { caseId } = useParams();
  const [caseData, setCaseData] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [clientData, setClientData] = useState(null);
  const [loading, setLoading] = useState(true);

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
      } catch (error) {
        console.error('Failed to fetch data:', error);
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
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {caseData.case_name}
      </Typography>
      
      <Typography variant="h6" gutterBottom>
        Case Details
      </Typography>
      <Typography>Type: {caseData.case_type}</Typography>
      <Typography>Status: {caseData.case_status}</Typography>
      <Typography>Next Hearing: {caseData.next_hearing_date}</Typography>
      
      <div style={{ margin: '20px 0' }}>
        <Button 
          variant="contained" 
          onClick={() => handleStatusUpdate('ongoing')}
          disabled={caseData.case_status === 'ongoing'}
        >
          Mark as Ongoing
        </Button>
        <Button 
          variant="contained" 
          color="success"
          onClick={() => handleStatusUpdate('completed')}
          disabled={caseData.case_status === 'completed'}
          sx={{ ml: 2 }}
        >
          Mark as Completed
        </Button>
      </div>

      {clientData && (
        <>
          <Typography variant="h6" gutterBottom>
            Client Information
          </Typography>
          <Typography>Name: {clientData.full_name}</Typography>
          <Typography>Contact: {clientData.contact_phone}</Typography>
        </>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Documents
        </Typography>
        <Button 
          variant="contained" 
          color="secondary"
          onClick={() => generateCaseReport(caseData, documents)}
        >
          Generate Report
        </Button>
      </Box>
      <DocumentUpload />
      
      <List>
        {documents.length === 0 ? (
          <Typography>No documents uploaded.</Typography>
        ) : (
          documents.map((document) => (
            <ListItem key={document.id}>
              <ListItemText 
                primary={document.name} 
                secondary={document.description || 'No description'} 
              />
              <Button 
                href={document.file_path} 
                target="_blank"
                rel="noopener noreferrer"
              >
                View
              </Button>
            </ListItem>
          ))
        )}
      </List>
    </Card>
  );
};

export default CaseDetail;