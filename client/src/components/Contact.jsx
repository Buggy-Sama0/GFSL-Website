import React, { useState, useEffect } from 'react';
import './Contact.css';

function Contact() {
  useEffect(() => {
    document.title = 'Contact Gurkha Force Security — Request a Quote or Site Survey';
    const meta = document.querySelector('meta[name="description"]');
    const content = 'Contact Gurkha Force Security for professional security services, site surveys and tailored protection plans in Hong Kong.';
    if (meta) meta.setAttribute('content', content);
    else { const m = document.createElement('meta'); m.name = 'description'; m.content = content; document.head.appendChild(m); }
  }, []);
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // client-side stub: show success state
    setSubmitted(true);
    setForm({ name: '', email: '', phone: '', service: '', message: '' });
    setTimeout(() => setSubmitted(false), 4000);
  }

  return (
    <main className="contact-page">
      <header className="contact-hero">
        <div>
          <h2 className="contact-title">Contact Gurkha Force Security</h2>
          <p className="contact-subtitle">Trusted security partners for construction, corporate & residential sites — reach out for a tailored quote or site survey.</p>
        </div>
      </header>

      <section className="contact-grid">
        <aside className="contact-left">
          <div className="contact-card">
            <h3>Get in touch</h3>
            <p><strong>Phone:</strong> <a href="tel:+85237584165">+852 3758 4165</a></p>
            <p><strong>Email:</strong> <a href="mailto:gurkha.forces@gmail.com">gurkha.forces@gmail.com</a></p>
            <p><strong>Address:</strong><br />Goldfield Industrial Building, 144-150 Tai Lin Pai Road, Kwai Chung, NT, Hong Kong</p>
            <h4 style={{marginTop: '1rem'}}>Business Hours</h4>
            <p>Mon–Fri: 09:00 — 18:00<br />Sat: 09:00 — 13:00</p>
          </div>

          <div className="emergency-contact">
            <h3>Emergency Line</h3>
            <p>For urgent security incidents call our 24/7 emergency team.</p>
            <a className="emergency-btn" href="tel:+85260358016">Call Emergency</a>
          </div>
        </aside>

        <div className="contact-right">
          <form className="contact-form" onSubmit={handleSubmit} aria-label="Contact form">
            <div className="form-row">
              <div className="form-group">
                <label className="required">Full name</label>
                <input name="name" value={form.name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label className="required">Email</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Phone</label>
                <input name="phone" value={form.phone} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Service of interest</label>
                <select name="service" value={form.service} onChange={handleChange}>
                  <option value="">General enquiry</option>
                  <option value="manned-guarding">Manned Guarding</option>
                  <option value="mobile-patrols">Mobile Patrols</option>
                  <option value="event-security">Event Security</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="required">Message</label>
              <textarea name="message" value={form.message} onChange={handleChange} required />
            </div>

            <button className="cta-btn" type="submit">Send Enquiry</button>

            {submitted && <div className="contact-success">Thanks — we received your enquiry and will get back within one business day.</div>}
          </form>

          <div className="contact-map-section">
            <h3>Office Area</h3>
            <div className="contact-map-wrapper">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1844.9349798262676!2d114.12961425376285!3d22.358538509613602!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3403f9a21ba1c393%3A0x538b50efe28743c2!2z6YeR6LGQ5bel5qWt5aSn5buI!5e0!3m2!1sen!2shk!4v1752568511037!5m2!1sen!2shk" 
                title="Gurkha Force Security Office"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Contact;
