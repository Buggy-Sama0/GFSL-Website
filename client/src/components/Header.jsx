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
          src="/Company_Logo.png" 
          alt="Gurkha Force Security Limited Logo" 
        />
        <div>
          <span className="company-name">Gurkha Force Security Ltd</span>
          <div className="slogan small">Trusted Since 1998</div>
        </div>
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
  <a className="cta-quote" href="/contact" onClick={() => setMenuOpen(false)}>Get a Quote</a>
      </nav>
    </header>
  );
}

export default Header;