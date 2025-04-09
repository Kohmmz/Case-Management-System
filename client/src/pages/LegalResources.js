import React, { useState } from 'react';
import { searchLegalResources } from '../../utils/api';
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Divider,
  Grid,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip
} from '@mui/material';
import { Search, Article, Gavel, MenuBook } from '@mui/icons-material';

const LegalResources = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resourceType, setResourceType] = useState('all');
  const [jurisdiction, setJurisdiction] = useState('all');

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const params = {
        query,
        type: resourceType !== 'all' ? resourceType : undefined,
        jurisdiction: jurisdiction !== 'all' ? jurisdiction : undefined
      };
      
      const res = await searchLegalResources(params);
      setResults(res);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch legal resources');
    } finally {
      setLoading(false);
    }
  };

  const getResourceIcon = (type) => {
    switch(type) {
      case 'case': return <Gavel color="primary" />;
      case 'statute': return <MenuBook color="secondary" />;
      default: return <Article />;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Legal Resources
      </Typography>

      <Card sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="flex-end">
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Search legal resources"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </Grid>

          <Grid item xs={6} sm={3} md={2}>
            <FormControl fullWidth>
              <InputLabel>Resource Type</InputLabel>
              <Select
                value={resourceType}
                label="Resource Type"
                onChange={(e) => setResourceType(e.target.value)}
              >
                <MenuItem value="all">All Types</MenuItem>
                <MenuItem value="case">Case Law</MenuItem>
                <MenuItem value="statute">Statutes</MenuItem>
                <MenuItem value="article">Articles</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6} sm={3} md={2}>
            <FormControl fullWidth>
              <InputLabel>Jurisdiction</InputLabel>
              <Select
                value={jurisdiction}
                label="Jurisdiction"
                onChange={(e) => setJurisdiction(e.target.value)}
              >
                <MenuItem value="all">All Jurisdictions</MenuItem>
                <MenuItem value="federal">Federal</MenuItem>
                <MenuItem value="state">State</MenuItem>
                <MenuItem value="international">International</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <Button
              fullWidth
              variant="contained"
              onClick={handleSearch}
              disabled={loading || !query.trim()}
              startIcon={loading ? <CircularProgress size={20} /> : <Search />}
            >
              {loading ? 'Searching...' : 'Search'}
            </Button>
          </Grid>
        </Grid>
      </Card>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {results.length > 0 && (
        <Paper elevation={2} sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Search Results ({results.length})
          </Typography>
          <Divider sx={{ mb: 2 }} />
          
          <List>
            {results.map((result) => (
              <ListItem key={result.id} sx={{ py: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                  {getResourceIcon(result.type)}
                </Box>
                <ListItemText
                  primary={result.title}
                  secondary={
                    <>
                      <Typography component="span" variant="body2">
                        {result.citation || 'No citation available'}
                      </Typography>
                      <br />
                      <Typography component="span" variant="body2" color="text.secondary">
                        {result.summary || 'No summary available'}
                      </Typography>
                    </>
                  }
                />
                <Chip 
                  label={result.type} 
                  size="small" 
                  sx={{ ml: 2 }}
                />
                <Button 
                  variant="outlined" 
                  sx={{ ml: 2 }}
                  href={result.url || '#'}
                  target="_blank"
                >
                  View
                </Button>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default LegalResources;
