// src/components/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>&copy; {new Date().getFullYear()} CTK Store App. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
