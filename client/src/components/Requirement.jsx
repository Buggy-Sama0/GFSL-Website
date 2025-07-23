import React from 'react';
import './Requirement.css';

const requirements = [
  { name: 'HKID', description: 'Valid Hong Kong Identity Card.' },
  { name: 'Safety Card', description: 'Construction site safety card.' },
  { name: 'CWR Card', description: 'Construction Worker Registration Card.' },
  { name: 'QAS Certificate', description: 'Qualified Accredited Security certificate.' },
  { name: 'SPP Permit', description: 'Security Personnel Permit.' },
  { name: 'Address Proof', description: 'Recent utility bill, bank statement, or government letter.' }
];

function Requirements() {
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

    </main>
  );
}

export default Requirements;