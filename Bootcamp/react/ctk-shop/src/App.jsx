import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Store from './components/Store';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (data) => {
    // TODO: Replace this dummy logic with your API call
    console.log('Login data:', data);
    setIsAuthenticated(true);
  };

  const handleRegister = (data) => {
    // TODO: Replace this dummy logic with your API call
    console.log('Registration data:', data);
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register onRegister={handleRegister} />} />
          <Route path="/store" element={isAuthenticated ? <Store /> : <Navigate to="/login" />} />
          <Route path="/" element={<Navigate to={isAuthenticated ? "/store" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
