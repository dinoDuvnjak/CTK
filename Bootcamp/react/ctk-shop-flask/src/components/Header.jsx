// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Header({ onLogout }) {
  return (
    <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          My Store App
        </Link>
        <a
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasic"
          onClick={(e) => {
            const target = document.getElementById('navbarBasic');
            e.currentTarget.classList.toggle('is-active');
            target.classList.toggle('is-active');
          }}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasic" className="navbar-menu">
        <div className="navbar-start">
          <Link className="navbar-item" to="/stores">
            Stores
          </Link>
          <Link className="navbar-item" to="/items">
            Items
          </Link>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <Link className="button is-light" to="/store/create">
                Create Store
              </Link>
              <Link className="button is-light" to="/item/create">
                Create Item
              </Link>
              <button className="button is-danger" onClick={onLogout}>
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
