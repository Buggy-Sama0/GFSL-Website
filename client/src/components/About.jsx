import React from 'react';
import './About.css';

const team = [
  {
    id: 1,
    name: "Limbu Bisnukumar",
    role: "Managing Director",
    photo: "/images/team/jane-doe.jpg",
    quote: "Safety isn't expensive, it's priceless."
  },
  {
    id: 2,
    name: "Waiba Kamali",
    role: "Director",
    photo: "/images/team/john-smith.jpg",
    quote: "Prevention is better than reaction."
  },
];

const milestones = [
  { 
    year: 2013, 
    event: "Founded with focus on corporate manned security services",
    icon: "🏢"
  },
  {
    year: 2023,
    event: "Boost of contracts with major corporations",
    icon: "📈"
  },
  { 
    year: 2023, 
    event: "Recieved Certification of Appreciation from Paul Y.-CREC JV",
    icon: "🎖️"
  },
];

const coreValues = [
  {
    title: "Integrity",
    description: "We operate with uncompromising ethical standards",
    icon: "🤝"
  },
  {
    title: "Vigilance",
    description: "Constant awareness is our default state",
    icon: "👀"
  },
  {
    title: "Innovation",
    description: "We stay ahead of emerging threats",
    icon: "💡"
  }
];

function About() {
  return (
    <section className="about" id="about">
      <h2>About Us</h2>
      <p>
        <strong>Our Mission:</strong> To provide reliable, innovative security solutions with a customer-first approach.
      </p>
      <p>
        <strong>Values:</strong> Integrity, professionalism, and continuous improvement.
      </p>

      <h3>Our Core Values</h3>
      <div className="values-grid">
        {coreValues.map((value, index) => (
          <div className="value-card" key={index}>
            <div className="value-icon">{value.icon}</div>
            <h4>{value.title}</h4>
            <p>{value.description}</p>
          </div>
        ))}
      </div>

      <h3>Our Journey</h3>
      <ul className="timeline">
        {milestones.map((milestone, index) => (
          <li key={index}>
            <span className="timeline-date">{milestone.year} {milestone.icon}</span>
            {milestone.event}
          </li>
        ))}
      </ul>

      <h3>Executive Protection Team</h3>
      <div className="team">
        {team.map((member) => (
          <div className="team-member" key={member.id}>
            <img 
              src={member.photo} 
              alt={member.name} 
              className="team-photo" 
              loading="lazy"
            />
            <h4>{member.name}</h4>
            <p className="position">{member.role}</p>
            <p className="bio">{member.bio}</p>
            <blockquote className="member-quote">"{member.quote}"</blockquote>
          </div>
        ))}
      </div>

      <h3>Security Briefing</h3>
      <div className="video-message">
        <div className="video-container">
          <iframe
            src="https://www.youtube.com/embed/security-video-id"
            title="Security Briefing"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <p className="video-caption">
          Watch our CEO discuss emerging security threats and our proactive solutions.
        </p>
      </div>
    </section>
  );
}

export default About;