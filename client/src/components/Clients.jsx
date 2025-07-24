import React from 'react';
import './Clients.css';

function Clients() {
  return (
    <section className="clients">
      <h2 className="clients-title">Our Trusted Clients</h2>
      <p className="clients-subtitle">We take pride in working with these esteemed partners.</p>
      <div className="clients-grid">
        <div className="client-card">
          <div className="client-logo-container">
            <img src="/CRCC_KW_PAUL.jpg" alt="Client 1" className="client-logo" />
          </div>
          <p className="client-name">Client 1</p>
          <p className="client-testimonial">"Client 1's testimonial goes here."</p>
        </div>
        <div className="client-card">
          <div className="client-logo-container">
            <img src="/CW.jpg" alt="Client 2" className="client-logo" />
          </div>
          <p className="client-name">Client 2</p>
          <p className="client-testimonial">"Client 2's testimonial goes here."</p>
        </div>
        <div className="client-card">
          <div className="client-logo-container">
            <img src="/CRCC.png" alt="Client 3" className="client-logo" />
          </div>
          <p className="client-name">Client 3</p>
          <p className="client-testimonial">"Client 3's testimonial goes here."</p>
        </div>
        <div className="client-card">
          <div className="client-logo-container">
            <img src="/CSCE.png" alt="Client 4" className="client-logo" />
          </div>
          <p className="client-name">Client 4</p>
          <p className="client-testimonial">"Client 4's testimonial goes here."</p>
        </div>
        <div className="client-card">
          <div className="client-logo-container">
            <img src="/Bouygues.png" alt="Client 5" className="client-logo" />
          </div>
          <p className="client-name">Client 5</p>
          <p className="client-testimonial">"Client 5's testimonial goes here."</p>
        </div>
        <div className="client-card">
          <div className="client-logo-container">
            <img src="/Yau Lee.png" alt="Client 6" className="client-logo" />
          </div>
          <p className="client-name">Client 6</p>
          <p className="client-testimonial">"Client 6's testimonial goes here."</p>
        </div>
        <div className="client-card">
          <div className="client-logo-container">
            <img src="/BKRC.png" alt="Client 7" className="client-logo" />
          </div>
          <p className="client-name">Client 7</p>
          <p className="client-testimonial">"Client 7's testimonial goes here."</p>
        </div>
        <div className="client-card">
          <div className="client-logo-container">
            <img src="/CHEC.png" alt="Client 8" className="client-logo" />
          </div>
          <p className="client-name">Client 8</p>
          <p className="client-testimonial">"Client 8's testimonial goes here."</p>
        </div>
        <div className="client-card">
          <div className="client-logo-container">
            <img src="/Sinohydro.png" alt="Client 9" className="client-logo" />
          </div>
          <p className="client-name">Client 9</p>
          <p className="client-testimonial">"Client 9's testimonial goes here."</p>
        </div>
        <div className="client-card">
          <div className="client-logo-container">
            <img src="/Dragages.png" alt="Client 10" className="client-logo" />
          </div>
          <p className="client-name">Client 10</p>
          <p className="client-testimonial">"Client 10's testimonial goes here."</p>
        </div>
        <div className="client-card">
          <div className="client-logo-container">
            <img src="/Paul_Y.png" alt="Client 11" className="client-logo" />
          </div>
          <p className="client-name">Client 11</p>
          <p className="client-testimonial">"Client 11's testimonial goes here."</p>
        </div>
      </div>
    </section>
  );
}

export default Clients;