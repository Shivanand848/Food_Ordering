import React, { useContext } from 'react';
import { AuthContext } from './Authprovider';
import { Navigate } from 'react-router-dom';

const ProtectedRouting = ({children}) => {
    const { user } = useContext(AuthContext);
    return (
        <div>
            {
        user?<Navigate to={'/'}/>:children
      }

        </div>
    );
}

export default ProtectedRouting;
