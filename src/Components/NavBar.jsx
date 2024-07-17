import React from 'react';
import { NavLink } from 'react-router-dom';
import './NB.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">WayfinderABA</div>
      <div className="navbar-links">
        <NavLink to="/identify-name" className="active-link">Name</NavLink>
        <NavLink to="/identify-object" className="active-link">Objects</NavLink>
        <NavLink to="/identify-emotion" className="active-link">Emotions</NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
