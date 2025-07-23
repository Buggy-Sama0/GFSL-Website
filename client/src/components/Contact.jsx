import React, { useState } from 'react';
import './Contact.css';
import axios from 'axios';


const services = [
  'Manned Guarding',
];
const apiUrl = import.meta.env.VITE_API_URL;
const initialState={ name: '', email: '', phone: '', service: ''}

function Contact() {
  const [form, setForm] = useState(initialState);
  const [files, setFiles]=useState([])
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = e => {
    setFiles(e.target.files)
    //console.log(e.target.files); 
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitted(true);

    if(!files) {
      return;
    }

    // Here you would handle sending the form data
    const formData=new FormData();
    for (let file of files) {
      formData.append("document_files", file)
    }
    // Append each form field individually
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("phone", form.phone);
    formData.append("service", form.service);
    
    try {
      const response = await axios.post(`${apiUrl}api/addForm`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },  
      });

      console.log('Form Data Submitted:', response.data);

      setForm(initialState);
      setFiles(null);
    } catch (error) {
      console.log('Error submitting form:', error);
      setError('There was an error submitting your form. Please try again later.');
      setSubmitted(false);
    } finally {
      setLoading(false);
      setForm(initialState);
      setFiles([]);
    }
  };

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
          <p>Sunday: Closed</p>
        </div>

        <div>
          <h3>Application Form</h3>
          {submitted &&
            <div className="contact-success"
            style={{
              position: 'relative',
              padding: '1rem',
              margin: '1rem 0',
              background: '#d4edda',
              color: '#155724',
              borderRadius: '4px'
            }}>
              Thank you! We will get back to you soon.
              <button onClick={()=> setSubmitted(false)}
                style={{
                position: 'absolute',
                top: '0.5rem',
                right: '0.5rem',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1rem'
              }}>X</button>
            </div> 
          }
            <form className="contact-form" onSubmit={handleSubmit}>
              <input name="name" type="text" placeholder="Your Name" value={form.name} onChange={handleChange} required />
              <input name="email" type="email" placeholder="Your Email" value={form.email} onChange={handleChange} required />
              <input name="phone" type="tel" placeholder="Your Phone" value={form.phone} onChange={handleChange} />
              <select name="service" value={form.service} onChange={handleChange} required>
                <option value="">Select Service</option>
                {services.map((s, idx) => <option key={idx} value={s}>{s}</option>)}
              </select>

              <div className="form-group">
                <label>Attach Documents (HKID, Safety Card, CWR Card, etc)</label>
                <input type="file" name="files" onChange={handleFileChange} multiple/>
                {files.length > 0 && (
                    <div style={{ marginTop: '0.5rem' }}>
                      <small>Selected files: {Object.entries(files).map(([key, file])=> file.name).join(', ')}</small>
                    </div>
                )}
              </div>
              {error && <div style={{ color: 'var(--secondary-accent)', marginTop: '1rem'}}>{error}</div>}

              <button type="submit" className="cta-btn">
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </form>
          
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
