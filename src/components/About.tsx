import "./styles/About.css";
import { education, profile } from "../data/profile";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para">{profile.about}</p>
        <div className="about-meta">
          <div>
            <span>Based in</span>
            <strong>{profile.location}</strong>
          </div>
          <div>
            <span>Availability</span>
            <strong>{profile.workPermit}</strong>
          </div>
        </div>
        <div className="about-education">
          {education.map((item) => (
            <div className="about-education-item" key={item.title}>
              <span>{item.period}</span>
              <h4>{item.title}</h4>
              <p>{item.place}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
