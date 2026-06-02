import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";
import { profile } from "../data/profile";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a href={`mailto:${profile.email}`} data-cursor="disable">
                {profile.email}
              </a>
            </p>
            <h4>Location</h4>
            <p>
              <span>{profile.location}</span>
            </p>
          </div>
          <div className="contact-box">
            <h4>LinkedIn</h4>
            <a
              href={profile.linkedin}
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Open profile <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2>
              Senior iOS/tvOS Developer <br /> focused on{" "}
              <span>Apple product engineering</span>
            </h2>
            <h5>
              <MdCopyright /> 2026
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
