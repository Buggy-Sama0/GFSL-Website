import React, {useState, useEffect} from 'react';
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

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files); // convert FileList -> File[]
    setFiles(prev =>
      {
      const next = [...prev, ...newFiles]; // merge with existing files
      //console.log('files ->', next);
      return next;
    });
  };

  useEffect(() => {
    //console.log('File State changed:', files);    
  }, [files]);

const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if(!files || files.length==0) {
      setError('Please attcah atleast one document!')
      return;
    }
    // Here you would handle sending the form data
    const formData=new FormData();
    /*
    for (let file of files) {
      console.log(file);
      formData.append("document_files", Array.from(file))
      console.log('Form Data: ', formData);
    }*/

    files.forEach((file) => {
      console.log('Appending file:', file.name, file.size, file.type);
      formData.append('document_files', file);
      console.log(formData);
      
    });

    // Append each form field individually
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("phone", form.phone);
    formData.append("service", form.service);
    
    try {
      const response = await axios.post(`${apiUrl}/api/apply`, formData, {
        timeout: 180000,
      });
      console.log('Form Data Submitted:', response.data);
      console.log('File _id: ', response.data.id);
      setFileId(response.data.id);
      setFiles([]);
      setSubmitted(true);
      setForm(initialState);
    } catch (error) {
      console.log('Error submitting form:', error);
      //setError('There was an error submitting your form. Please try again later.');  
      const serverMsg = error.response?.data || error.message; //*** */
      setError(typeof serverMsg === 'string' ? serverMsg : JSON.stringify(serverMsg)); /** */   
      setSubmitted(false);
    } finally {
      setLoading(false);
      /*
      setTimeout(() => {
        setError(null);
      }, 4000)*/
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
            <div className="contact-success success-animate">
              <span className="success-icon" aria-label="Success">&#10004;</span>
              <span className="success-text">Thank you! We will get back to you soon.</span>
              <button className="success-close" onClick={()=> setSubmitted(false)} aria-label="Close">&times;</button>
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
                <input type="file" name="files" onChange={handleFileChange}/>
                <input type="file" name="files" onChange={handleFileChange}/>
                <input type="file" name="files" onChange={handleFileChange}/>
                <input type="file" name="files" onChange={handleFileChange}/>
                <input type="file" name="files" onChange={handleFileChange}/>
                <input type="file" name="files" onChange={handleFileChange}/>
                <input type="file" name="files" onChange={handleFileChange}/>
                <input type="file" name="files" onChange={handleFileChange}/>
                <input type="file" name="files" onChange={handleFileChange}/>
                {files.length > 0 && (
                    <div style={{ marginTop: '0.5rem' }}>
                      <small>Selected files: {Object.entries(files).map(([key, file])=> file.name).join(', ')}</small>
                    </div>
                )}
              </div>
              {error && (
                <div className={`error-message${error ? ' show' : ''}`}>
                  <span className="error-icon" aria-label="Error">&#9888;</span>
                  <span className="error-text">{error}</span>
                  <button className="error-close" onClick={() => setError(null)} aria-label="Close">&times;</button>
                </div>
              )}

              <button type="submit" className="cta-btn">
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </form>
        </div>
    </main> 
  );
}

export default Requirements;