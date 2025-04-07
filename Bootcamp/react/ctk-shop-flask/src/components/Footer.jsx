// src/components/Footer.jsx
import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>&copy; {new Date().getFullYear()} CTK Store App. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
