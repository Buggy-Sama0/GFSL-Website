import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleHamburgerClick = () => setMenuOpen((prev) => !prev);

  // Close on escape and lock body scroll when mobile menu open
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? '' : '';
  }, [menuOpen]);

  // Shrink header when scrolling
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-logo" aria-hidden={menuOpen}>
        <img src="/Company_Logo.png" alt="Gurkha Force Security Limited Logo" />
        <div>
          <span className="company-name">Gurkha Force Security Ltd</span>
          <div className="slogan small">Trusted Since 1998</div>
        </div>
      </div>

      <button
        className={`header-hamburger${menuOpen ? ' active' : ''}`}
        onClick={handleHamburgerClick}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

  <nav className={`header-nav${menuOpen ? ' active' : ''}`} aria-hidden={!menuOpen}>
        <NavLink to="/" onClick={() => setMenuOpen(false)} className={({isActive}) => isActive ? 'active-nav' : ''}>Home</NavLink>
        <NavLink to="/about" onClick={() => setMenuOpen(false)} className={({isActive}) => isActive ? 'active-nav' : ''}>About</NavLink>
        <NavLink to="/services" onClick={() => setMenuOpen(false)} className={({isActive}) => isActive ? 'active-nav' : ''}>Services</NavLink>
        <NavLink to="/clients" onClick={() => setMenuOpen(false)} className={({isActive}) => isActive ? 'active-nav' : ''}>Clients</NavLink>
        <NavLink to="/requirements" onClick={() => setMenuOpen(false)} className={({isActive}) => isActive ? 'active-nav' : ''}>Job Requirements</NavLink>
        <NavLink to="/contact" onClick={() => setMenuOpen(false)} className={({isActive}) => isActive ? 'active-nav' : ''}>Contact</NavLink>
        <a className="cta-quote" href="/contact" onClick={() => setMenuOpen(false)}>Get a Quote</a>
      </nav>
    </header>
  );
}

export default Header;