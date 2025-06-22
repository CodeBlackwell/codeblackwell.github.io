import type { FC } from 'react';
import { Link } from 'react-router-dom';

const Navbar: FC = () => (
  <nav>
    <Link to="/" className="nav-link nav-home">Home</Link>
    <Link to="/about" className="nav-link">About</Link>
    <Link to="/projects" className="nav-link">Projects</Link>
    <Link to="/techstack" className="nav-link">Tech Stack</Link>
    <Link to="/contact" className="nav-link">Contact</Link>
    <Link to="/resume" className="nav-link">Resume</Link>
  </nav>
);

export default Navbar;
