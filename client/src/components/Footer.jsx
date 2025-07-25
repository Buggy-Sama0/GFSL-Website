import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <img src="/Company_Logo.png" alt="Company Logo" />
          <span className="footer-company">Gurkha Force Security Ltd</span>
        </div>
        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/services">Services</a>
          <a href="/industries">Industries</a>
          <a href="/requirements">Job Requirements</a>
          <a href="/contact">Contact</a>
        </div>
        <div className="footer-contact">
          <span>📞 +852 3758 4165</span>
          <span>✉️ gurkha.forces@gmail.com</span>
        </div>
      </div>
      <div className="footer-bottom">
        <span>&copy; {new Date().getFullYear()} Gurkha Force Security Ltd. All rights reserved.</span>
      </div>
    </footer>
  );
}

export default Footer;