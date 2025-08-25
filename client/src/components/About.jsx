import React, { useEffect } from 'react';
import './About.css';

const team = [
  {
    id: 1,
    name: "Limbu Bisnukumar",
    role: "Managing Director",
    photo: "/images/team/jane-doe.jpg",
    quote: "Safety isn't expensive, it's priceless."
  },
  {
    id: 2,
    name: "Waiba Kamali",
    role: "Director",
    photo: "/images/team/john-smith.jpg",
    quote: "Prevention is better than reaction."
  },
];

const milestones = [
  { 
    year: 2013, 
    event: "Founded with focus on corporate manned security services",
    icon: "🏢"
  },
  {
    year: 2023,
    event: "Boost of contracts with major corporations",
    icon: "📈"
  },
  { 
    year: 2023, 
    event: "Recieved Certification of Appreciation from Paul Y.-CREC JV",
    icon: "🎖️"
  },
];

const coreValues = [
  {
    title: "Integrity",
    description: "We operate with uncompromising ethical standards",
    icon: "🤝"
  },
  {
    title: "Vigilance",
    description: "Constant awareness is our default state",
    icon: "👀"
  },
  {
    title: "Innovation",
    description: "We stay ahead of emerging threats",
    icon: "💡"
  }
];

const testimonials = [
  { id: 1, name: 'ACME Construction', quote: 'Reliable, punctual and professional security teams — helped us reduce theft incidents to zero.' },
  { id: 2, name: 'Greenfield Estates', quote: 'Responsive management and clear reporting; a partner we trust across multiple sites.' },
];

const awards = [
  { id: 1, title: 'Certificate of Appreciation', issuer: 'Paul Y.-CREC JV', img: '/Images/award.png' },
  { id: 2, title: 'ISO Certification', issuer: 'ISO', img: '/Images/iso-cert.png' },
];

const faqs = [
  { question: 'How quickly can you deploy a team?', answer: 'We typically deploy within 48–72 hours depending on licensing and site access.' },
  { question: 'Do you provide training records and reporting?', answer: 'Yes — every shift comes with a digital report and any incidents are logged and shared.' },
  { question: 'Can you handle multiple sites across regions?', answer: 'We have the capacity and logistics to support multi-site contracts with centralized coordination.' },
];


function About() {
  useEffect(() => {
    document.title = 'About Gurkha Force Security — Trusted Security Company in Hong Kong';
    const meta = document.querySelector('meta[name="description"]');
    const content = "Learn about Gurkha Force Security's mission, values and expertise in providing professional manned guarding, patrols and security consulting in Hong Kong.";
    if (meta) meta.setAttribute('content', content);
    else {
      const m = document.createElement('meta'); m.name = 'description'; m.content = content; document.head.appendChild(m);
    }
  }, []);
  return (
    <section className="about" id="about">
      <div className="about-hero">
        <div className="hero-left">
          <h2>About Us</h2>
          <p>
            Gurkha Force Security Ltd is a trusted provider of comprehensive security solutions, combining decades of field experience.
            We partner with businesses and communities to deliver tailored guarding, patrol, and monitoring services—prioritizing prevention, clear communication, and measurable results. 
            Built on integrity, vigilance, and innovation, our teams are committed to protecting people and assets with professionalism and rapid response, backed by transparent reporting and continuous improvement.
          </p>
          <p>
            <strong>Our Mission:</strong> To provide reliable, innovative security solutions with a customer-first approach.
          </p>
          <p>
            <strong>Values:</strong> Integrity, professionalism, and continuous improvement.
          </p>
          <div className="hero-actions">
            <a href="/services" className="secondary-link">Explore Services</a>
          </div>
        </div>
        <div className="hero-right" aria-hidden>
          <img src="/photo2.jpg" alt="Company visual" />
        </div>
      </div>

      <h3>Our Core Values</h3>
      <div className="values-grid">
        {coreValues.map((value, index) => (
          <div className="value-card" key={index}>
            <div className="value-icon">{value.icon}</div>
            <h4>{value.title}</h4>
            <p>{value.description}</p>
          </div>
        ))}

        {/* Visual/illustration inside core values */}
        <div className="values-visual">
          <img src="/photo4.jpg" alt="Our team in action" loading="lazy" />
        </div>
      </div>

      <h3>Our Journey</h3>
      <ul className="timeline">
        {milestones.map((milestone, index) => (
          <li key={index}>
            <span className="timeline-date">{milestone.year} {milestone.icon}</span>
            {milestone.event}
          </li>
        ))}
      </ul>

      <h3>Executive Protection Team</h3>
      <div className="team">
        {team.map((member) => (
          <div className="team-member" key={member.id}>
            <img 
              src={member.photo} 
              alt={member.name} 
              className="team-photo" 
              loading="lazy"
            />
            <h4>{member.name}</h4>
            <p className="position">{member.role}</p>
            <p className="bio">{member.bio}</p>
            <blockquote className="member-quote">"{member.quote}"</blockquote>
          </div>
        ))}
      </div>

      <h3>Security Briefing</h3>
      <div className="video-message">
        <div className="video-container">
          <iframe
            src="https://www.youtube.com/embed/security-video-id"
            title="Security Briefing"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <p className="video-caption">
          Watch our CEO discuss emerging security threats and our proactive solutions.
        </p>
      </div>

      <section className="stats-strip">
        <div className="stats-row">
          <div className="stat"><div className="num">10+</div><div className="label">Years Experience</div></div>
          <div className="stat"><div className="num">500+</div><div className="label">Shifts Delivered</div></div>
          <div className="stat"><div className="num">40+</div><div className="label">Clients Served</div></div>
          <div className="stat"><div className="num">4.0</div><div className="label">Average Rating</div></div>
        </div>
      </section>

      <h3>What Clients Say</h3>
      <div className="testimonials-grid">
        {testimonials.map(t => (
          <blockquote key={t.id} className="testimonial-card">“{t.quote}”<footer>- {t.name}</footer></blockquote>
        ))}
      </div>

      <h3>Awards & Recognitions</h3>
      <div className="awards-row">
        {awards.map(a => (
          <div className="award" key={a.id}>
            <img src={a.img} alt={a.title} />
            <div>
              <div className="award-label">{a.title}</div>
              <div className="award-issuer">{a.issuer}</div>
            </div>
          </div>
        ))}
      </div>

      <h3>Frequently Asked Questions</h3>
      <div className="faq-list">
        {faqs.map((f, i) => (
          <details className="faq-item" key={i}>
            <summary>{f.question}</summary>
            <p>{f.answer}</p>
          </details>
        ))}
      </div>

      <div className="about-cta">
        <h3>Ready to secure your site?</h3>
        <p>Contact our team for a free site assessment and tailored quotation.</p>
        <a className="cta-btn" href="/contact">Get a Quote</a>
      </div>

    </section>
  );
}

export default About;