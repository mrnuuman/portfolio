import { PropsWithChildren } from "react";
import { highlights, profile } from "../data/profile";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              MUHAMMAD
              <br />
              <span>NOUMAN</span>
            </h1>
            <p>{profile.intro}</p>
            <div className="landing-actions">
              <a href={`mailto:${profile.email}`} data-cursor="disable">
                Email me
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                data-cursor="disable"
              >
                LinkedIn
              </a>
            </div>
          </div>
          <div className="landing-info">
            <h3>{profile.location}</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">Senior</div>
              <div className="landing-h2-2">iOS/tvOS</div>
            </h2>
            <h2>
              <div className="landing-h2-info">Developer</div>
              <div className="landing-h2-info-1">Engineer</div>
            </h2>
            <div className="landing-proof">
              {highlights.map((item) => (
                <div className="landing-proof-item" key={item.label}>
                  <span>{item.value}</span>
                  <p>{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
