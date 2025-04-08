import { useState } from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';

function AddAdvocate() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log({ name, email, phone });
    alert('Advocate added!');
    setName('');
    setEmail('');
    setPhone('');
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6">Add New Advocate</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Add Advocate
        </Button>
      </form>
    </Box>
  );
}

export default AddAdvocate;