import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCases } from '../../utils/api';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';
import { FilterList, Sort, Today, Event } from '@mui/icons-material';

const CaseList = () => {
  const navigate = useNavigate();
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: '',
    type: '',
    dateRange: '',
    court: '',
    search: ''
  });
  const [sortBy, setSortBy] = useState('next_hearing_date');
  const [viewMode, setViewMode] = useState('all');

  useEffect(() => {
    const fetchCases = async () => {
      try {
        setLoading(true);
        const params = {
          ...filters,
          sort: sortBy,
          view: viewMode
        };
        const response = await getCases(params);
        setCases(response);
      } catch (error) {
        console.error('Failed to fetch cases:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCases();
  }, [filters, sortBy, viewMode]);

  const handleFilterChange = (name, value) => {
    setFilters({ ...filters, [name]: value });
  };

  const statusColors = {
    ongoing: 'primary',
    completed: 'success',
    pending: 'warning'
  };

  if (loading) return <Typography>Loading cases...</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Case Management
      </Typography>

      {/* Filters and Controls */}
      <Card sx={{ mb: 3, p: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Search Cases"
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
            />
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={filters.status}
                label="Status"
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="ongoing">Ongoing</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                value={filters.type}
                label="Type"
                onChange={(e) => handleFilterChange('type', e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="civil">Civil</MenuItem>
                <MenuItem value="criminal">Criminal</MenuItem>
                <MenuItem value="family">Family</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <FormControl fullWidth>
              <InputLabel>Date Range</InputLabel>
              <Select
                value={filters.dateRange}
                label="Date Range"
                onChange={(e) => handleFilterChange('dateRange', e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="today">Today</MenuItem>
                <MenuItem value="week">This Week</MenuItem>
                <MenuItem value="month">This Month</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <FormControl fullWidth>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                label="Sort By"
                onChange={(e) => setSortBy(e.target.value)}
              >
                <MenuItem value="next_hearing_date">Hearing Date</MenuItem>
                <MenuItem value="case_name">Case Name</MenuItem>
                <MenuItem value="filing_date">Filing Date</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={1}>
            <Button
              variant="contained"
              startIcon={<FilterList />}
              onClick={() => setViewMode(viewMode === 'all' ? 'mine' : 'all')}
            >
              {viewMode === 'all' ? 'All Cases' : 'My Cases'}
            </Button>
          </Grid>
        </Grid>
      </Card>

      {/* View Mode Tabs */}
      <Box sx={{ display: 'flex', mb: 2 }}>
        <Button
          variant={viewMode === 'today' ? 'contained' : 'outlined'}
          startIcon={<Today />}
          onClick={() => setViewMode('today')}
          sx={{ mr: 1 }}
        >
          Today
        </Button>
        <Button
          variant={viewMode === 'upcoming' ? 'contained' : 'outlined'}
          startIcon={<Event />}
          onClick={() => setViewMode('upcoming')}
        >
          Upcoming
        </Button>
      </Box>

      {/* Case List */}
      <Grid container spacing={3}>
        {cases.length === 0 ? (
          <Typography sx={{ p: 3 }}>No cases found matching your criteria.</Typography>
        ) : (
          cases.map((caseItem) => (
            <Grid item xs={12} sm={6} md={4} key={caseItem.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {caseItem.case_name}
                  </Typography>
                  <Chip
                    label={caseItem.case_status}
                    color={statusColors[caseItem.case_status] || 'default'}
                    size="small"
                    sx={{ mb: 1 }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    Type: {caseItem.case_type}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Court: {caseItem.court_name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Next Hearing: {new Date(caseItem.next_hearing_date).toLocaleDateString()}
                  </Typography>
                  <Button
                    size="small"
                    onClick={() => navigate(`/cases/${caseItem.id}`)}
                    sx={{ mt: 1 }}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default CaseList;
