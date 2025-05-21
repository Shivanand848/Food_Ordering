import React from 'react';
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './foodcourt/Home';
import Contact from './foodcourt/Contact';
import Login from './foodcourt/Login';
import Register from './foodcourt/Register';
import Navbar from './foodcourt/Navbar';
import Cart from './foodcourt/Cart';
import { ToastContainer } from 'react-toastify';
import ProtectedRouting from './Context/ProtectedRouting';
const App = () => {
  return (
    <div>
      <BrowserRouter>
      {/* <Navbar/> */}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/login' element={<ProtectedRouting><Login/></ProtectedRouting>}/>
        <Route path='/register' element={<ProtectedRouting><Register/></ProtectedRouting>}/>
        <Route path='/cart' element={<Cart/>}/>
      </Routes>
      <ToastContainer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
