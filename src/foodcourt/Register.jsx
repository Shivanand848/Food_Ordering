import { Box, Button, TextField } from '@mui/material'
import { toUnitless } from '@mui/material/styles/cssUtils';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navbar from './Navbar';

const Register = () => {
  const[name,setName] = useState();
  const[email,setEmail] = useState();
  const[password,setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit=(e)=>{
    e.preventDefault()
    if(!name || !email || !password){
       toast.error('Plese Fill all Form')
      return
    }
    const user = {name,email,password}
    localStorage.setItem('user',JSON.stringify(user));
    navigate('/login');
  }

  return (
    <>
    <Navbar/>
      <Box sx={{boxShadow:10,maxWidth:650,display:'flex',justifyContent:'center',alignItems:'center',mx:'auto',flexDirection:'column',p:5,mt:11,borderRadius:5}}>
        <h2 style={{color:'black',textDecoration:'underline'}}>Register</h2>
        <form>
          <TextField label="Name" type='name' value={name} onChange={(e)=>setName(e.target.value)} margin='normal' variant='standard' fullWidth required/>
          <TextField label="Email" type='email' margin='normal' value={email} variant='standard' onChange={(e)=>setEmail(e.target.value)} fullWidth required/>
          <TextField label="Password" type='password' variant='standard' value={password} onChange={(e)=>setPassword(e.target.value)} margin='normal' fullWidth required/>
          <Button variant='contained' margin='normal' fullWidth onClick={handleSubmit}>Submit</Button>
        </form>
      </Box>
    </>
  )
}

export default Register