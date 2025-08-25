import './Home.css';
import { Helmet } from 'react-helmet-async';

function Home() {
  return (
    <main className="home">
      <Helmet>
        <title>Gurkha Force Security Ltd — Professional Security Services Hong Kong</title>
        <meta name="description" content="Gurkha Force Security Ltd provides manned guarding, event security and construction site protection in Hong Kong. Contact us for tailored security solutions." />
      </Helmet>
      {/* Hero - BusTraveller style split hero */}
  <section className="hero hero-anim">
        <div className="hero-inner">
          <div className="hero-left">
            <h1>Gurkha Force Security Ltd</h1>
            <p className="hero-sub">Your trusted partner in tailored security services — experienced, discreet, professional.</p>
            <div className="hero-actions">
              <a href="/contact" className="cta-btn">Get a Quote</a>
            </div>
          </div>

          <div className="hero-right">
            {/* Using the project Company_Logo.png from public; replace with employee photos or other marketing images if available */}
            <img src="./photo1.jpg" alt="Company showcase" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-card features">
        <h2>Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🏆</div>
            <h4>Experienced Team</h4>
            <p>Decades of proven security expertise and discipline.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h4>Trained & Certified</h4>
            <p>Regular training and modern equipment for reliable protection.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🤝</div>
            <h4>Client Focused</h4>
            <p>Flexible contracts and attentive customer service.</p>
          </div>
        </div>
      </section>

      {/* Services - updated to reflect actual offerings */}
      <section className="section-card services">
        <h2>Our Services</h2>
        <p className="services-sub">We provide professional security solutions tailored to events, construction sites, and buildings of all kinds.</p>
        <div className="services-grid">
          <div className="service-card service-featured">
            <div className="featured-icon">👷‍♂️</div>
            <div className="featured-body">
              <h3>Construction Site Security Services</h3>
              <p>
                Comprehensive protection for construction sites: equipment guarding, access control, workforce screening, and 24/7 site patrols to prevent theft and vandalism.
              </p>
              <a className="read-more" href="/services/construction-site">Read More</a>
            </div>
          </div>

          <div className="service-card">
            <div className="service-icon">🎪</div>
            <h4>Event Security</h4>
            <p>Trained crowd management, entry screening, VIP protection and emergency response for indoor and outdoor events of any scale.</p>
            <a className="read-more" href="/services/event-security">Read More</a>
          </div>

          <div className="service-card">
            <div className="service-icon">🏢</div>
            <h4>Residential / Commercial / Industrial</h4>
            <p>Security for buildings and schools: concierge, mobile patrols, CCTV monitoring and tailored site procedures to keep occupants safe.</p>
            <a className="read-more" href="/services/building-security">Read More</a>
          </div>

          <div className="service-card">
            <div className="service-icon">🔒</div>
            <h4>Access Control & Monitoring</h4>
            <p>Access management, alarm monitoring and rapid response solutions that integrate with your site operations and systems.</p>
            <a className="read-more" href="/services/access-control">Read More</a>
          </div>
        </div>
      </section> 

      {/* Projects (skeleton) */}
      <section className="section-card">
        <h3>Projects</h3>
        <div className="projects-grid">
          <div className="proj-card">
            <img src="/CRCC_KW_PAUL.jpg" alt="Project CRCC" />
            <div className="proj-meta"><h5>CRCC Project</h5><small>Reconstruction</small></div>
          </div>
          <div className="proj-card">
            <img src="/CW.jpg" alt="Project CW" />
            <div className="proj-meta"><h5>CW Site</h5><small>Security Rollout</small></div>
          </div>
          <div className="proj-card">
            <img src="/Paul_Y.png" alt="Project Paul" />
            <div className="proj-meta"><h5>Paul Y</h5><small>Site Management</small></div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="section-card">
        <div className="stats-row">
          <div className="stat">
            <div className="num">10+</div>
            <div className="label">Years Experience</div>
          </div>
          <div className="stat">
            <div className="num">12k</div>
            <div className="label">Happy Clients</div>
          </div>
          <div className="stat">
            <div className="num">4.8</div>
            <div className="label">Overall Rating</div>
          </div>
        </div>
      </section>

      {/* Trust logos */}
      <section className="section-card">
        <h3>Trusted By</h3>
        <div className="trust-logos">
          <img src="/Images/iso-cert.png" alt="ISO Certified" />
          <img src="/Images/sia-cert.png" alt="SIA Certified" />
          <img src="/Images/award.png" alt="Award" />
        </div>
      </section>
    </main>
  );
}

export default Home;



