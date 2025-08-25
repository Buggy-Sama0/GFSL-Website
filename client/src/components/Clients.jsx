import React, { useState, useEffect } from 'react';
import './Clients.css';

const CLIENTS = [
  { id: 1, name: 'CRCC KW Paul', logo: '/CRCC_KW_PAUL.jpg', testimonial: 'Reliable partner on major projects.' },
  { id: 2, name: 'CW', logo: '/CW.jpg', testimonial: 'Professional and timely service.' },
  { id: 3, name: 'CRCC', logo: '/CRCC.png', testimonial: 'Strong collaboration across teams.' },
  { id: 4, name: 'CSCE', logo: '/CSCE.png', testimonial: 'Trusted for large-scale works.' },
  { id: 5, name: 'Bouygues', logo: '/Bouygues.png', testimonial: 'High standards and clear communication.' },
  { id: 6, name: 'Yau Lee', logo: '/Yau Lee.png', testimonial: 'Consistent results on complex sites.' },
  { id: 7, name: 'BKRC', logo: '/BKRC.png', testimonial: 'Great safety and coordination.' },
  { id: 8, name: 'CHEC', logo: '/CHEC.png', testimonial: 'Excellent local knowledge and support.' },
  { id: 9, name: 'Sinohydro', logo: '/Sinohydro.png', testimonial: 'Skilled workforce and logistics.' },
  { id: 10, name: 'Dragages', logo: '/Dragages.png', testimonial: 'Dependable across phases.' },
  { id: 11, name: 'Paul Y', logo: '/Paul_Y.png', testimonial: 'Long-standing client relationship.' }
];

function Clients() {
  useEffect(() => {
    document.title = 'Our Clients — Gurkha Force Security';
    const meta = document.querySelector('meta[name="description"]');
    const content = 'Trusted clients and project partners of Gurkha Force Security Ltd. We serve construction, corporate and residential sectors across Hong Kong.';
    if (meta) meta.setAttribute('content', content);
    else { const m = document.createElement('meta'); m.name = 'description'; m.content = content; document.head.appendChild(m); }
  }, []);
  const [active, setActive] = useState(null);

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') setActive(null);
    }
    if (active) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [active]);

  return (
    <section className="clients">
      <Helmet>
        <title>Our Clients — Gurkha Force Security</title>
        <meta name="description" content="Trusted clients and project partners of Gurkha Force Security Ltd. We serve construction, corporate and residential sectors across Hong Kong." />
      </Helmet>
      <div className="clients-container">
        <h2 className="clients-title">Our Trusted Clients</h2>
        <p className="clients-subtitle">We take pride in working with these esteemed partners across Hong Kong and the region.</p>

        <div className="clients-grid">
          {CLIENTS.map((c) => (
            <button
              key={c.id}
              className="client-card"
              onClick={() => setActive(c)}
              aria-label={`Open details for ${c.name}`}
            >
              <div className="client-logo-container">
                <img src={c.logo} alt={c.name} className="client-logo" loading="lazy" />
              </div>
              <p className="client-name">{c.name}</p>
              <p className="client-testimonial">{c.testimonial}</p>
            </button>
          ))}
        </div>

        {active && (
          <div className="client-modal" role="dialog" aria-modal="true" aria-label={`${active.name} details`}>
            <div className="client-modal-backdrop" onClick={() => setActive(null)} />
            <div className="client-modal-content">
              <button className="client-modal-close" onClick={() => setActive(null)} aria-label="Close">×</button>
              <div className="client-modal-body">
                <div className="client-modal-image">
                  <img src={active.logo} alt={active.name} />
                </div>
                <div className="client-modal-info">
                  <h3>{active.name}</h3>
                  <p>{active.testimonial}</p>
                  <p>We have provided tailored security and site services for {active.name} on multiple projects, including mobilisation, perimeter security and trained on-site officers — with a focus on safety and compliance.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Clients;