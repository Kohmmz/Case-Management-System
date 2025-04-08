import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@mui/material';

const CaseList = () => {
  const [cases, setCases] = useState([]);
  const [filters, setFilters] = useState({ status: '', caseType: '', date: '' });

  // Fetch cases when filters or component mount
  useEffect(() => {
    const fetchCases = () => {
      let url = '/api/cases?';
      if (filters.status) url += `status=${filters.status}&`;
      if (filters.caseType) url += `case_type=${filters.caseType}&`;
      if (filters.date) url += `date=${filters.date}`;

      axios.get(url)
        .then(response => setCases(response.data))
        .catch(error => console.error('Error fetching cases:', error));
    };

    fetchCases();
  }, [filters]);

  return (
    <div>
      <TextField
        label="Filter by Status"
        value={filters.status}
        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        fullWidth
      />
      <TextField
        label="Filter by Case Type"
        value={filters.caseType}
        onChange={(e) => setFilters({ ...filters, caseType: e.target.value })}
        fullWidth
      />
      <TextField
        label="Filter by Date"
        value={filters.date}
        onChange={(e) => setFilters({ ...filters, date: e.target.value })}
        fullWidth
      />
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Case ID</TableCell>
              <TableCell>Case Name</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cases.map((caseItem) => (
              <TableRow key={caseItem.id}>
                <TableCell>{caseItem.case_id}</TableCell>
                <TableCell>{caseItem.case_name}</TableCell>
                <TableCell>{caseItem.case_status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CaseList;