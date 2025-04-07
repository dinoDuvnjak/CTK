// src/components/Layout.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function Layout({ children }) {
  const location = useLocation();
  // Hide header when on the login page
  const showHeader = location.pathname !== '/login';

  return (
    <>
      {showHeader && <Header />}
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
