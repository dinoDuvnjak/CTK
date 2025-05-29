// src/App.tsx
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register';
import StoreList from './components/StoreList';
import ItemList from './components/ItemList';
import StoreForm from './components/StoreForm';
import ItemForm from './components/ItemForm';
import Layout from './components/Layout';

type AuthHandler = (data: any) => void;

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  const handleLogin: AuthHandler = (data) => {
    // TODO: replace with your real API call & data type
    console.log('Login data:', data);
    setIsAuthenticated(true);
  };

  const handleRegister: AuthHandler = (data) => {
    // TODO: replace with your real API call & data type
    console.log('Registration data:', data);
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <Layout>
        <Routes>
          <Route
            path="/login"
            element={<Login onLogin={handleLogin} />}
          />
          <Route
            path="/register"
            element={<Register onRegister={handleRegister} />}
          />
          <Route
            path="/stores"
            element={
              isAuthenticated ? <StoreList /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/items"
            element={
              isAuthenticated ? <ItemList /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/store/create"
            element={
              isAuthenticated ? <StoreForm /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/item/create"
            element={
              isAuthenticated ? (
                // TODO: dynamic storeId once you wire that up
                <ItemForm storeId={1} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/"
            element={
              <Navigate to={isAuthenticated ? '/stores' : '/login'} />
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
