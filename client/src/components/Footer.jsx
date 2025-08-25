import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const linkArray=[
    {name:'Home', route:'/'},
    {name:'About', route:'/about'},
    {name:'Services', route:'/services'},
    {name:'Clients', route:'/clients'},
    {name:'Job Requirements', route:'/requirements'},
    {name:'Contact', route:'/contact'},
  ];

  const subscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    // lightweight optimistic UI (no network call here)
  setSubscribed(true);
  setEmail('');
  setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="footer">
      <div className="footer-cta">
        <div className="cta-inner">
          <div>
            <h3>Secure your site today</h3>
            <p>Talk with our specialists for a tailored security plan — fast quotes and reliable staffing.</p>
          </div>
          <div className="cta-actions">
            <a href="/contact" className="cta-btn">Request a Quote</a>
            <form className="newsletter" onSubmit={subscribe} aria-label="Newsletter signup">
              <input type="email" placeholder="Your business email" value={email} onChange={e => setEmail(e.target.value)} aria-label="Email address" />
              <button type="submit">Subscribe</button>
              {subscribed && <div className="subscribed-note" role="status">Subscribed — thanks!</div>}
            </form>
          </div>
        </div>
      </div>

      <div className="footer-content">
        <div className="footer-logo">
          <img src="/Company_Logo.png" alt="Company Logo" />
          <span className="footer-company">Gurkha Force Security Ltd</span>
        </div>

        <div className="footer-links">
          
          {/*<NavLink to="/" className={({isActive})=> isActive?'active-footer':'' }>Home</NavLink>
          <NavLink to="/about" className={({isActive})=> isActive?'active-footer':'' } >About</NavLink>
          <NavLink to="/services" className={({isActive})=> isActive?'active-footer':'' }>Services</NavLink>
          <NavLink to="/clients" className={({isActive})=> isActive?'active-footer':'' }>Clients</NavLink>
          <NavLink to="/requirements" className={({isActive})=> isActive?'active-footer':'' }>Job Requirements</NavLink>
          <NavLink to="/contact" className={({isActive})=> isActive?'active-footer':'' }>Contact</NavLink> */}

          {linkArray.map((object) => (
            <NavLink to={object.route} className={({isActive})=> isActive?'active-footer':'' }>{object.name} </NavLink>
          ))}

        </div>

        <div className="footer-contact">
          <a href="tel:+85237584165" className="phone">📞 +852 3758 4165</a>
          <a href="mailto:gurkha.forces@gmail.com" className="email">✉️ gurkha.forces@gmail.com</a>
          <div className="socials">
            <a href="#" target="_blank" aria-label="LinkedIn">in</a>
            <a href="https://www.facebook.com/gurkhaforceshk/" target="_blank" aria-label="Facebook">f</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>&copy; {new Date().getFullYear()} Gurkha Force Security Ltd. All rights reserved.</span>
        <span className="copy-right-note">Made with care • Privacy • Terms</span>
      </div>
    </footer>
  );
}

export default Footer;