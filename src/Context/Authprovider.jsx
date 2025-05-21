import React, { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const AuthContext = createContext();
const Authprovider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, [])

  const login = (email, password) => {
    const retrievedUser = JSON.parse(localStorage.getItem('user'))
    if (retrievedUser && retrievedUser.email === email && retrievedUser.password === password) {
        setUser(retrievedUser)
        localStorage.setItem('loggedInUser', JSON.stringify(retrievedUser));
        toast.success('User LoggedIn Successfully...')
    }
     if (!email || !password) {
          toast.error('Please fill in both email and password');
          return;
        }
        
    else {
        // toast.warning('Invalid Email or Password');
    }
    
}

  const logout = () => {
    setUser(null)
    localStorage.removeItem('loggedInUser');
    toast.warning('User LoggedOut Successfully...', { position: 'top-center' })
  }
  return (
    <div>
      <AuthContext.Provider value={{ user, logout , login }}>
        {children}
      </AuthContext.Provider>
    </div>
  );
}

export default Authprovider;
