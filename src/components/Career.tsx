import "./styles/Career.css";
import { experience } from "../data/profile";

const Career = () => {
  return (
    <div className="career-section section-container" id="experience">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          {experience.map((item, index) => (
            <div className="career-info-box" key={`${item.company}-${item.role}`}>
              <div className="career-info-in">
                <div className="career-logo">
                  <img src={item.logo} alt={`${item.company} logo`} />
                </div>
                <div className="career-role">
                  <span>{item.location}</span>
                  <h4>{item.role}</h4>
                  <h5>{item.company}</h5>
                </div>
                <h3>{index === 0 ? "NOW" : `0${index}`}</h3>
              </div>
              <div className="career-copy">
                <strong>{item.period}</strong>
                <p>{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Career;
