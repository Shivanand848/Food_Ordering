import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navbar from './Navbar';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error('Please fill out all fields');
      return;
    }

    const user = { name, email, password };
    localStorage.setItem('user', JSON.stringify(user));
    toast.success('Registration Successful!');
    navigate('/login');
  };

  return (
    <>
      <Navbar />

      <Box
        component={Paper}
        elevation={6}
        sx={{
          maxWidth: 500,
          mx: 'auto',
          mt: 10,
          p: 4,
          borderRadius: 4,
          textAlign: 'center',
          backgroundColor: '#fdfdfd'
        }}
      >
        <Typography variant="h4" fontWeight="bold" mb={2} color="primary">
          Create Account
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={3}>
          Sign up to start ordering your favorite food!
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Full Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            required
          />

          <TextField
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            required
          />

          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            required
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3, py: 1.5, fontWeight: 'bold', borderRadius: 2 }}
          >
            Register
          </Button>
        </form>
      </Box>
    </>
  );
};

export default Register;
