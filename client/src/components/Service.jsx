import React, { useState } from 'react';
import './Service.css';

const services = [
  {
    title: 'Manned Guarding',
    subtitle: '(Armed/Unarmed)',
    details: 'Professional, vetted security officers for your premises, available armed or unarmed as per your needs.'
  },
];

const caseStudies = [
  {
    client: 'XYZ Mall',
    result: 'Reduced theft by 70% with integrated manned guarding and CCTV monitoring.'
  },
  {
    client: 'ABC Corporation',
    result: 'Secured executive travel and events with VIP protection and event security.'
  }
];

function Services() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <main className="services-page">
      <h2 className="services-title">Our Services</h2>
      <div className="services-list">
        {services.map((service, idx) => (
          <div className="service-item" key={idx}>
            <button className="service-header" onClick={() => setOpenIndex(openIndex === idx ? null : idx)}>
              <span>{service.title} {service.subtitle && <small>{service.subtitle}</small>}</span>
              <span>{openIndex === idx ? '−' : '+'}</span>
            </button>
            {openIndex === idx && (
              <div className="service-details">{service.details}</div>
            )}
          </div>
        ))}
      </div>

      <h3 className="case-title">Case Studies</h3>
      <ul className="case-list">
        {caseStudies.map((cs, idx) => (
          <li key={idx}><strong>{cs.client}:</strong> {cs.result}</li>
        ))}
      </ul>

      <h3 className="compare-title">Compare Packages</h3>
      <div className="compare-table-wrapper">
        <table className="compare-table">
          <thead>
            <tr>
              <th>Feature</th>
              <th>Basic</th>
              <th>Premium</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Manned Guarding</td>
              <td>Unarmed</td>
              <td>Armed/Unarmed</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="config-title">Service Configurator</h3>
      <div className="configurator">
        <p>Want to know what security solution fits you best?</p>
        <a href="#contact" className="cta-btn">Calculate Your Security Needs</a>
      </div>
    </main>
  );
}

export default Services;