import './Home.css';

function Home() {
  return (
    <main className="home">
      {/* Modern Hero Section with split layout */}
      <section className="hero modern-hero">
        <div className="hero-content">
          <h1>
            <span role="img" aria-label="shield" style={{fontSize: '2.5rem', verticalAlign: 'middle'}}>🛡️</span>
            Gurkha Force Security Ltd
          </h1>
          <p className="hero-tagline">Protecting People, Property & Peace of Mind</p>
          
        </div>
        <div className="hero-image">
          <img src="/assets/Company_Logo.png" alt="Company Logo" style={{maxWidth: '180px', borderRadius: '24px', boxShadow: '0 4px 32px rgba(26,42,58,0.18)'}} />
        </div>
      </section>

      {/* Features Section */}
      <section className="section-card features">
        <h2>Why Choose Us?</h2>
        <div className="features-list">
          <div className="feature">
            <span role="img" aria-label="experience" style={{fontSize: '2rem'}}>🏆</span>
            <p>Decades of security expertise</p>
          </div>
          <div className="feature">
            <span role="img" aria-label="tech" style={{fontSize: '2rem'}}>💡</span>
            <p>Modern technology & training</p>
          </div>
          <div className="feature">
            <span role="img" aria-label="customer" style={{fontSize: '2rem'}}>🤝</span>
            <p>Customer-focused protection</p>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="section-card">
        <h3>Our Services</h3>
        <div className="services-overview">
          <a href="#" className="service-card">
            <span role="img" aria-label="Guard">🛡️</span>
            Manned Guarding
          </a>
          <a href="#" className="service-card">
            <span role="img" aria-label="CCTV">🎥</span>
            CCTV Monitoring
          </a>
          <a href="#" className="service-card">
            <span role="img" aria-label="Patrol">🚓</span>
            Mobile Patrols
          </a>
          <a href="#" className="service-card">
            <span role="img" aria-label="Alarm">🔔</span>
            Alarm Response
          </a>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="section-card">
        <h3>Trusted By</h3>
        <div className="trust-logos">
          <img src="/Images/iso-cert.png" alt="ISO Certified" />
          <img src="/Images/sia-cert.png" alt="SIA Certified" />
          <img src="/Images/award.png" alt="Award" />
          {/* Add client logos as needed */}
        </div>
      </section>
    </main>
  );
}

export default Home;