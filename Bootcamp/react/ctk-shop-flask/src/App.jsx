// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import StoreList from './components/StoreList';
import ItemList from './components/ItemList';
import StoreForm from './components/StoreForm';
import ItemForm from './components/ItemForm';
import Layout from './components/Layout';

function AppWrapper() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('access_token'));

  const handleLogin = (data) => {
    if (data.access_token && data.refresh_token) {
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
      setIsAuthenticated(true);
    }
  };

  const handleLogout = () => {
    console.log('Logging out');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  const handleRegister = (data) => {
    console.log('Registration data:', data);
  };

  return (
    <Layout onLogout={handleLogout}>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register onRegister={handleRegister} />} />
        <Route path="/stores" element={isAuthenticated ? <StoreList /> : <Navigate to="/login" />} />
        <Route path="/items" element={isAuthenticated ? <ItemList /> : <Navigate to="/login" />} />
        <Route path="/store/create" element={isAuthenticated ? <StoreForm /> : <Navigate to="/login" />} />
        <Route path="/item/create" element={isAuthenticated ? <ItemForm storeId={1} /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to={isAuthenticated ? "/stores" : "/login"} />} />
      </Routes>
    </Layout>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
