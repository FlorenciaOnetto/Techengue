import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Crearemos este archivo para los estilos

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/ManoPerro.png" alt="Logo" className="logo" />
        <h1>TailWaggers</h1>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/profile">Pet Profile</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
