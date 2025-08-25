import React, { useState, useEffect } from 'react';
import './Service.css';

const services = [
  {
    title: 'Manned Guarding',
    subtitle: '(Unarmed)',
    img: '/photo2.jpg',
    details: [
      `Our manned guarding service provides licensed security personnel trained to the standards required in Hong Kong. Officers are briefed on local licensing, reporting requirements and client-specific site procedures before deployment.`,
      `We emphasise professionalism: crisp uniforms, clear identification, bilingual communication (Cantonese & English) and strictly enforced patrol and access protocols. Officers maintain visitor logs, incident reports and use digital shift handover tools so management always has a real-time view.`,
      `Services are configurable — static posts, roving patrols, reception and concierge duties, high-visibility deterrence and covert plain-clothes options for sensitive roles. We also provide supervisory visits and regular audit reports to ensure quality and compliance.`
    ]
  },
  {
    title: 'Event Security',
    subtitle: '(Crowd, Access & VIP)',
    img: '/photo5.jpg',
    details: [
      `Event security for corporate functions, concerts, exhibitions and private events with capacity planning, site access control and emergency egress management designed for Hong Kong venues.`,
      `Our team coordinates with venue management and local authorities as needed, manages credentialing and entry screening, implements crowd-flow plans and operates dedicated VIP protection teams where required.`,
      `All event officers are trained in customer-facing de-escalation, basic first-aid and incident reporting; we provide an on-site team leader and post-event debrief with recommendations for continuous improvements.`
    ]
  },
  {
    title: 'Construction Site Security',
    subtitle: '(Equipment Protection & Patrols)',
    img: '/photo3.jpg',
    details: [
      `Construction sites present high-risk assets — our construction security packages combine perimeter control, vehicle & material checks, and scheduled mobile patrols tailored to complex site layouts found in Hong Kong.`,
      `We integrate with site supervisors to align guard duties with shift patterns, delivery windows and contractors' access schedules. Officers are trained to spot common theft vectors and to secure plant and machinery overnight.`,
      `Detailed incident logs, gate logs for vehicles and personnel, and photographic evidence are provided as standard. We can also supply CCTV monitoring and remote alarm response as add-ons.`
    ]
  }
];

function Services() {
  const [openIndex, setOpenIndex] = useState(null);
  const [lightboxSrc, setLightboxSrc] = useState(null);

  // open lightbox with given image src
  const openLightbox = (src) => setLightboxSrc(src);

  // close lightbox
  const closeLightbox = () => setLightboxSrc(null);

  // close on ESC
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') closeLightbox(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <main className="services-page">
      <h2 className="services-title">Our Services</h2>
      <div className="services-grid">
        {services.map((service, idx) => (
          <article className="service-card" key={idx}>
            <div className="service-media">
              <img src={service.img} alt={service.title} loading="lazy" onClick={() => openLightbox(service.img)} style={{cursor:'zoom-in'}} />
            </div>
            <div className="service-body">
              <h4>{service.title} <small>{service.subtitle}</small></h4>
              <p className="service-excerpt">{service.details}</p>
              <button className="more" onClick={() => setOpenIndex(openIndex === idx ? null : idx)}>
                {openIndex === idx ? 'Close' : 'Learn more'}
              </button>
              {openIndex === idx && (
                <div className="service-details">
                  {service.details.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* Lightbox modal */}
      {lightboxSrc && (
        <div className="lightbox" onClick={closeLightbox} role="dialog" aria-modal="true">
          <div className="lightbox-inner" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox} aria-label="Close image">×</button>
            <img src={lightboxSrc} alt="Service large view" />
          </div>
        </div>
      )}
    </main>
  );
}

export default Services;