import React, {useState,useContext, useEffect} from 'react';
import { useAuth } from './context/AuthContext';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {  Link,
  Navigate,
  Outlet,
} from 'react-router-dom'
import SideBar from './components/Sidebar';
import Login from './pages/Login/Login';
import Orders from './pages/Orders';
import Categories from './pages/categories/categories'
import './App.css';
import Menu from './pages/meubles/meuble';
import Dashboard from './pages/dashboard/dashboard'
import {Toaster} from 'react-hot-toast'

const ProtectedRoute = ({
  isAuthenticated,
  redirectPath = '/login',
  children,
}) => {


  console.log({auth : isAuthenticated})
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

function App() {

  const { state, logout, dispatch } = useAuth();

  let { isAuthenticated } = state


  return (
    <Router>
        <SideBar logout={logout}>
          <Toaster />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/meubles" element={<Menu />} />
              <Route path="/categories" element={<Categories/>} />
            </Route>
            <Route path="*" element={<p>There's nothing here: 404!</p>} />

          </Routes>
        </SideBar>
    </Router>
  );
}

export default App;
