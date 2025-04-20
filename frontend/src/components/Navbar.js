import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Navbar = ({ title, mode, toggleMode, handleLogout }) => {
  return (
    <nav className={`navbar navbar-expand-lg navbar-${mode} bg-${mode}`}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/dashboard">{title}</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/analyze">Analyze</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
          </ul>

          <div className="d-flex align-items-center">
            {/* Dark Mode Toggle */}
            <div className="form-check form-switch text-secondary mx-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexSwitchCheckDefault"
                onChange={toggleMode}
              />
              <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
                {mode === 'light' ? 'Dark Mode' : 'Light Mode'}
              </label>
            </div>

            {/* Logout Button */}
            <button onClick={handleLogout} className="btn btn-danger ms-2">Logout</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  toggleMode: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

Navbar.defaultProps = {
  title: 'Research Analyser',
};

export default Navbar;
