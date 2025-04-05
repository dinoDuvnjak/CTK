// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Store from './components/Store';
import StoreList from './components/StoreList';
import ItemList from './components/ItemList';
import StoreForm from './components/StoreForm';
import ItemForm from './components/ItemForm';
import Layout from './components/Layout';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const handleLogin = (data) => {
    // Replace with API call
    console.log('Login data:', data);
    setIsAuthenticated(true);
  };

  const handleRegister = (data) => {
    // Replace with API call
    console.log('Registration data:', data);
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register onRegister={handleRegister} />} />
          {/* <Route path="/store" element={isAuthenticated ? <Store /> : <Navigate to="/login" />} /> */}
          <Route path="/stores" element={isAuthenticated ? <StoreList /> : <Navigate to="/login" />} />
          <Route path="/items" element={isAuthenticated ? <ItemList /> : <Navigate to="/login" />} />
          <Route path="/store/create" element={isAuthenticated ? <StoreForm /> : <Navigate to="/login" />} />
          <Route path="/item/create" element={isAuthenticated ? <ItemForm storeId={1} /> : <Navigate to="/login" />} />
          <Route path="/" element={<Navigate to={isAuthenticated ? "/stores" : "/login"} />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
