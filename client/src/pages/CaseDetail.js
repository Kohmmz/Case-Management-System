import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, CircularProgress, Grid } from '@mui/material';

const CaseDetail = () => {
  const { id } = useParams(); // Get case id from URL
  const history = useHistory();
  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  // Fetch case details on page load
  useEffect(() => {
    axios.get(`/api/cases/${id}`)
      .then(response => {
        setCaseData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching case details:', error);
        setLoading(false);
      });
  }, [id]);

  // Handle case update
  const handleUpdate = () => {
    setIsUpdating(true);
    axios.put(`/api/cases/${id}`, caseData)
      .then(response => {
        setIsUpdating(false);
        history.push(`/cases`);
      })
      .catch(error => {
        console.error('Error updating case:', error);
        setIsUpdating(false);
      });
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <h2>Case Details</h2>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Case Name"
            value={caseData.case_name}
            onChange={(e) => setCaseData({ ...caseData, case_name: e.target.value })}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Case Status"
            value={caseData.case_status}
            onChange={(e) => setCaseData({ ...caseData, case_status: e.target.value })}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdate}
            disabled={isUpdating}
          >
            {isUpdating ? <CircularProgress size={24} /> : 'Update Case'}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default CaseDetail;
