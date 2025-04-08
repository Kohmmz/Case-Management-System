import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Typography } from '@mui/material';
import axios from 'axios';

const LegalResources = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [resources, setResources] = useState([]);

  // Handle search request
  const handleSearch = () => {
    if (searchQuery) {
      axios.get(`/api/resources/case-law?search=${searchQuery}`)
        .then(response => setResources(response.data))
        .catch(error => console.error('Error fetching resources:', error));
    }
  };

  return (
    <div>
      <TextField
        label="Search Case Law"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>Search</Button>
      
      <Grid container spacing={2} marginTop={2}>
        {resources.map((resource, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Paper elevation={3} padding={2}>
              <Typography variant="h6">{resource.title}</Typography>
              <Typography variant="body2">{resource.summary}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default LegalResources;
