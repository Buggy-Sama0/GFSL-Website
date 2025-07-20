import React from 'react';
import './About.css'; // Optional: for custom styles

const team = [
  {
    name: "Jane Doe",
    role: "CEO",
    photo: "jane.jpg", // Place in public folder or import
    certifications: ["CISSP", "MBA"],
    bio: "Jane has led our company since 2010, focusing on innovation and customer trust."
  },
  {
    name: "John Smith",
    role: "Lead Security Officer",
    photo: "john.jpg",
    certifications: ["CPP", "First Aid"],
    bio: "John brings 15 years of field experience and a passion for safety."
  }
  // Add more team members as needed
];

const milestones = [
  { year: 2010, event: "Company founded" },
  { year: 2012, event: "First major contract" },
  { year: 2018, event: "Expanded nationwide" },
  { year: 2024, event: "Awarded industry excellence" }
];

function About() {
  return (
    <section className="about">
      <h2>About Us</h2>
      <p>
        <strong>Our Mission:</strong> To provide reliable, innovative security solutions with a customer-first approach.
      </p>
      <p>
        <strong>Values:</strong> Integrity, professionalism, and continuous improvement.
      </p>

      <h3>Why Choose Us?</h3>
      <ul>
        <li>Decades of experience in security and protection</li>
        <li>Cutting-edge technology and ongoing staff training</li>
        <li>Focused on customer safety and satisfaction</li>
      </ul>

      <h3>Company Milestones</h3>
      <ul className="timeline">
        {milestones.map((m, idx) => (
          <li key={idx}><strong>{m.year}:</strong> {m.event}</li>
        ))}
      </ul>

      <h3>Meet the Team</h3>
      <div className="team">
        {team.map((member, idx) => (
          <div className="team-member" key={idx}>
            <img src={member.photo} alt={member.name} className="team-photo" />
            <h4>{member.name}</h4>
            <p>{member.role}</p>
            <p>Certifications: {member.certifications.join(', ')}</p>
            <p>{member.bio}</p>
          </div>
        ))}
      </div>

      <h3>Message from Our CEO</h3>
      <div className="video-message">
        {/* Replace with your actual video link or embed */}
        <iframe
          width="320"
          height="180"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="CEO Message"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </section>
  );
}

export default About;