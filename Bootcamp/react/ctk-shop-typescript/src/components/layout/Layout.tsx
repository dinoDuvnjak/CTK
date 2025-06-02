// src/components/Layout.tsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../header/Header';
import Footer from '../footer/Footer';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
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
};

export default Layout;
