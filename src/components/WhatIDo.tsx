import { useState } from "react";
import { capabilityTabs } from "../data/profile";
import "./styles/WhatIDo.css";

const WhatIDo = () => {
  const [activeTab, setActiveTab] = useState(0);
  const active = capabilityTabs[activeTab];

  return (
    <section className="whatIDO" id="capabilities">
      <div className="what-box">
        <h2 className="title">
          W<span className="hat-h2">HAT</span>
          <div>
            I<span className="do-h2"> DO</span>
          </div>
        </h2>
        <p>
          Native Apple-platform engineering with enough product thinking to keep
          the work useful, readable and shippable.
        </p>
      </div>

      <div className="what-tabs">
        <div className="what-tab-list" role="tablist" aria-label="Capabilities">
          {capabilityTabs.map((tab, index) => (
            <button
              className={index === activeTab ? "what-tab active" : "what-tab"}
              key={tab.title}
              onClick={() => setActiveTab(index)}
              role="tab"
              aria-selected={index === activeTab}
              type="button"
            >
              <span>{`0${index + 1}`}</span>
              {tab.title}
            </button>
          ))}
        </div>

        <div className="what-panel" role="tabpanel">
          <span className="what-kicker">{active.kicker}</span>
          <h3>{active.title}</h3>
          <p>{active.description}</p>

          <div className="what-point-grid">
            {active.points.map((point) => (
              <div className="what-point" key={point}>
                {point}
              </div>
            ))}
          </div>

          <h5>Skillset & tools</h5>
          <div className="what-content-flex">
            {active.tools.map((tool) => (
              <div className="what-tags" key={tool}>
                {tool}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIDo;
