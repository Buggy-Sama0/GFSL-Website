import React from 'react';
import './Clients.css';

function Clients() {
  return (
    <section className="clients">
      <h2 className="clients-title">Our Trusted Clients</h2>
      <div className="clients-grid">
        <div className="client-card">
          <img src="/public/CRCC_KW_PAUL.jpg" alt="Client 1" className="client-logo" />
          <p>Client 1 Description</p>
        </div>
        <div className="client-card">
          <img src="/public/CW.jpg" alt="Client 2" className="client-logo" />
          <p>Client 2 Description</p>
        </div>
        <div className="client-card">
          <img src="/public/Octocat.png" alt="Client 3" className="client-logo" />
          <p>Client 3 Description</p>
        </div>
      </div>
    </section>
  );
}

export default Clients;
