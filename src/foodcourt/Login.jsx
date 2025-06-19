import React, { useContext, useState } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { AuthContext } from '../Context/Authprovider';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please fill in both email and password');
      return;
    }

    try {
      await login(email, password);
      toast.success('Successfully Logged In!', { position: 'top-center' });
      setEmail('');
      setPassword('');
      navigate('/');
    } catch (error) {
      toast.error(error.message || 'Invalid email or password');
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
      <Box
        component={Paper}
        elevation={6}
        sx={{
          maxWidth: 450,
          mx: 'auto',
          mt: 10,
          p: 4,
          borderRadius: 3,
          textAlign: 'center',
          backgroundColor: '#fafafa',
        }}
      >
        <Typography variant="h4" fontWeight="bold" mb={3} color="primary">
          Login
        </Typography>

        <form onSubmit={handleLogin}>
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            variant="outlined"
            fullWidth
            required
            type="email"
            autoComplete="email"
          />

          <TextField
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            margin="normal"
            fullWidth
            required
            type="password"
            autoComplete="current-password"
          />

          <Button
            variant="contained"
            sx={{ mt: 3, py: 1.5, fontWeight: 'bold' }}
            fullWidth
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Box>
    </>
  );
};

export default Login;
