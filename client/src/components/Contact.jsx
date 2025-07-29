import React from 'react';
import './Contact.css';

function Contact() {
  return (
    <main className="contact-page">
      <h2 className="contact-title">Contact Gurkha Force Security</h2>
      <p className="contact-subtitle">
        Get in touch with our security experts for a consultation or to discuss your protection needs
      </p>

      <div className="contact-info">
        <div className="contact-card">
          <h3>Contact Information</h3>
          <p>
            <a href="tel:+85237584165">📞 +852 3758 4165</a>
          </p>
          <p>
            <a href="mailto:gurkha.forces@gmail.com">✉️ gurkha.forces@gmail.com</a>
          </p>
          <p>
            <strong>Headquarters:</strong><br />
            Goldfield Industrial Building<br />
            144-150 Tai Lin Pai Road<br />
            Kwai Chung, NT<br />
            Hong Kong
          </p>

          <h3 style={{ marginTop: '2rem' }}>Business Hours</h3>
          <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
          <p>Saturday: 9:00 AM - 1:00 PM</p>
          <p>Sunday & PH: Closed</p>
        </div>

      </div>
      <div className="contact-map-section">
        <h3>Our Office Area</h3>
        <div className="contact-map-wrapper">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1844.9349798262676!2d114.12961425376285!3d22.358538509613602!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3403f9a21ba1c393%3A0x538b50efe28743c2!2z6YeR6LGQ5bel5qWt5aSn5buI!5e0!3m2!1sen!2shk!4v1752568511037!5m2!1sen!2shk" 
            width="600" 
            height="450" 
            style={{ border: 0, borderRadius: '12px' }}
            allowfullscreen="" 
            loading="lazy" 
            referrerpolicy="no-referrer-when-downgrade">    
          </iframe>
        </div>
      </div>
    </main>
  );
}

export default Contact;
