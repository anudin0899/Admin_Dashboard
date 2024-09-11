// PrivateRoute.js
import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = () => {
    let auth = localStorage.getItem('admintoken')
   
    return (
        auth ? <Outlet /> : <Navigate to='/admin' />
    )
};

export default PrivateRoute;
