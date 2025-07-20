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

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = e => {
    setFiles(e.target.files)
    //console.log(e.target.files); 
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

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
    } 
  };

  return (
    <main className="contact-page">
      <h2 className="contact-title">Contact Us</h2>
      <div className="contact-info">
        <div>
          <h3>Get in Touch</h3>
          <p><strong>Phone:</strong> <a href="tel:+85237584165">+852 3758 4165</a></p>
          <p><strong>Email:</strong> <a href="mailto:gurkha.forces@gmail.com">gurkha.forces@gmail.com</a></p>
          <p><strong>Office:</strong> Goldfield Industial Building, 144-150 Tai Lin Pai Road, NT,  Hong Kong</p>
          <img src="/Images/contact-qr.png" alt="QR code to save contact" className="contact-qr" />
        </div>
        <div>
          <h3>Contact Form</h3>
          {submitted && (
            <div className="contact-success">Thank you! We will get back to you soon.</div>
          )}
            <form className="contact-form" onSubmit={handleSubmit}>
              <input name="name" type="text" placeholder="Your Name" value={form.name} onChange={handleChange} required />
              <input name="email" type="email" placeholder="Your Email" value={form.email} onChange={handleChange} required />
              <input name="phone" type="tel" placeholder="Your Phone" value={form.phone} onChange={handleChange} />
              <select name="service" value={form.service} onChange={handleChange} required>
                <option value="">Select Service</option>
                {services.map((s, idx) => <option key={idx} value={s}>{s}</option>)}
              </select>
              <input type="file" name="files" onChange={handleFileChange} multiple/>
              
              <button type="submit" className="cta-btn">Send Message</button>
            </form>
        </div>
        {files && (
          <div>
            <p>{files.name}</p>
            <p>{files.size} KBs</p>
          </div>
        )}
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
