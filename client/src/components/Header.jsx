import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleHamburgerClick = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <header className="header">
      <div className="header-logo">
        <img 
          src="/public/Company_Logo.png" 
          alt="Gurkha Force Security Limited Logo" 
        />
        <span className="company-name">Gurkha Force Security Ltd</span>
      </div>
      <div className="header-hamburger" onClick={handleHamburgerClick} aria-label="Toggle navigation" tabIndex={0} role="button">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <nav className={`header-nav${menuOpen ? ' active' : ''}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
        <Link to="/services" onClick={() => setMenuOpen(false)}>Services</Link>
        <Link to="/clients" onClick={() => setMenuOpen(false)}>Clients</Link>
        <Link to="/requirements" onClick={() => setMenuOpen(false)}>Job Requirements</Link>
        <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
      </nav>
    </header>
  );
}

export default Header;