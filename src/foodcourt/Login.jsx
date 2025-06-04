import { Box, Button, TextField } from '@mui/material';
import React, { useContext, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { AuthContext } from '../Context/Authprovider';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const{user,login}=useContext(AuthContext)

  const handleLogin = (e) => {
    e.preventDefault();
    login(email,password)

    // if (!email || !password) {
    //   toast.error('Please fill in both email and password');
    //   return;
    // }

    // const user = JSON.parse(localStorage.getItem('user'));

    // if (user && user.email === email && user.password === password) {
    //   localStorage.setItem('loggedInUser', JSON.stringify(user));
    //   toast.success('Successfully Logged In',{position:"top-center"});
    //   setEmail('');
    //   setPassword('');
    //   navigate('/');
    // } else {
    //   toast.error('Invalid email or password');
    // }
  };

  return (
    <>
    <Navbar/>
      <Box
        sx={{
          boxShadow: 10,
          maxWidth: 650,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mx: 'auto',
          flexDirection: 'column',
          p: 5,
          mt: 11,
          borderRadius: 5
        }}
      >
        <h2 style={{ color: 'black', textDecoration: 'underline' }}>Login</h2>
        <form onSubmit={handleLogin}>
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            variant="standard"
            fullWidth
          />
          
          <TextField
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="standard"
            margin="normal"
            fullWidth
            type="password"
          />

          <Button
            variant="contained"
            sx={{ mt: 2 }}
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
