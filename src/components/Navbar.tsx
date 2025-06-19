import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => (
  <nav style={{ display: 'flex', gap: 24, padding: 16, borderBottom: '1px solid #333', alignItems: 'center' }}>
    <Link to="/">Home</Link>
    <Link to="/about">About</Link>
    <Link to="/projects">Projects</Link>
    <Link to="/techstack">Tech Stack</Link>
    <Link to="/contact">Contact</Link>
    <Link to="/resume">Resume</Link>
  </nav>
);

export default Navbar;
