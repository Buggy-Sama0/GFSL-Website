import React, {useState} from 'react';
import './Requirement.css';
import axios from 'axios';

const requirements = [
  { name: 'HKID', description: 'Valid Hong Kong Identity Card.' },
  { name: 'Safety Card', description: 'Construction site safety card.' },
  { name: 'CWR Card', description: 'Construction Worker Registration Card.' },
  { name: 'QAS Certificate', description: 'Qualified Accredited Security certificate.' },
  { name: 'SPP Permit', description: 'Security Personnel Permit.' },
  { name: 'Address Proof', description: 'Recent utility bill, bank statement, or government letter.' },
  { name: 'Bank Card', description: 'Bank Card from recognized bank within HK' }
];

const services = [
  'Manned Guarding',
];
const apiUrl = import.meta.env.VITE_API_URL;
const initialState={ name: '', email: '', phone: '', service: ''}

function Requirements() {
  const [form, setForm] = useState(initialState);
  const [files, setFiles]=useState([])
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileId, setFileId]=useState();

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
      const response = await axios.post(`${apiUrl}/api/apply`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },  
      });
      console.log('Form Data Submitted:', response.data);
      console.log('File _id: ', response.data.id);
      setFileId(response.data.id);
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

    /* Download fetch api
  const downloadFile= async () => {
    const response=await axios.get(`${apiUrl}api/download/files/`+'688723999bc38f9bb5569237',
      {
        responseType: 'blob', // Important for binary files
      }
    );
    console.log(response.config.url);
    window.open(response.config.url, '_blank');
    // Extract filename from headers
    //const contentDisposition = response.headers['content-disposition'];
    // TRgger diwnload
  }
  */
  return (
    <main className="requirements-page">
      <h2 className="requirements-title">Job Application Requirements</h2>
      <p className="requirements-intro">To apply for a position at Gurkha Force Security Ltd, please ensure you have the following documents ready:</p>
      <ul className="requirements-list">
        {requirements.map((req, idx) => (
          <li key={idx} className="requirement-item">
            <span className="requirement-name">{req.name}</span>
            <span className="requirement-desc">{req.description}</span>
          </li>
        ))}
      </ul>
      <div className="requirements-note">
        <strong>Note:</strong> All documents must be valid and up-to-date. Originals and copies may be required during the interview process.
      </div>

      <div className="requirements-cta">
        <p>Ready to apply? Ensure you have all documents prepared before submitting your application.</p>
        <button className="requirements-button">
          Fill Application Form
          <span className="icon">→</span>
        </button>
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
    </main> 
  );
}

export default Requirements;