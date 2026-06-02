import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { appWork } from "../data/profile";
import "./styles/Work.css";

gsap.registerPlugin(ScrollTrigger);

const smoothScrollSpeed = 1;

const Work = () => {
  useLayoutEffect(() => {
    if (window.innerWidth <= 1025) return;

    let translateX = 0;
    const workSection = document.querySelector(".work-section") as HTMLElement | null;
    const setPinnedState = (isPinned: boolean) => {
      workSection?.classList.toggle("work-section-pinned", isPinned);
    };
    const getEndHoldDistance = () => Math.min(Math.max(window.innerHeight * 0.06, 48), 80);

    function setTranslateX() {
      const flex = document.querySelector(".work-flex") as HTMLElement | null;
      const container = document.querySelector(".work-container") as HTMLElement | null;

      if (!flex || !container) return 0;

      const containerWidth = container.clientWidth || container.getBoundingClientRect().width;
      const flexStyles = window.getComputedStyle(flex);
      const cards = Array.from(flex.querySelectorAll(".work-box")) as HTMLElement[];
      const cardsWidth = cards.reduce((total, card) => total + card.offsetWidth, 0);
      const startOffset = Math.abs(parseFloat(flexStyles.marginLeft)) || 0;
      const endPadding = Math.min(Math.max(containerWidth * 0.12, 96), 180);

      translateX = Math.max(0, cardsWidth + startOffset - containerWidth + endPadding);
      const scrollDistance = translateX + getEndHoldDistance();
      workSection?.style.setProperty(
        "--work-scroll-distance",
        `${Math.ceil(scrollDistance * smoothScrollSpeed)}px`
      );
      return translateX;
    }

    setTranslateX();

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: () => `+=${setTranslateX() + getEndHoldDistance()}`,
        scrub: true,
        pin: ".work-container",
        pinSpacing: false,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onEnter: () => setPinnedState(true),
        onEnterBack: () => setPinnedState(true),
        onLeave: () => setPinnedState(false),
        onLeaveBack: () => setPinnedState(false),
        id: "work",
      },
    });

    timeline.to(".work-flex", {
      x: () => -translateX,
      duration: 1,
      ease: "none",
    });

    timeline.to({}, {
      duration: 0.04,
    });

    const refreshScroll = () => {
      setTranslateX();
      ScrollTrigger.refresh();
    };

    requestAnimationFrame(refreshScroll);
    window.addEventListener("resize", refreshScroll);

    return () => {
      setPinnedState(false);
      workSection?.style.removeProperty("--work-scroll-distance");
      window.removeEventListener("resize", refreshScroll);
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);

  return (
    <section className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          Apps <span>I have worked on</span>
        </h2>
        <div className="work-flex">
          {appWork.map((project, index) => (
            <article className="work-box" key={project.title}>
              <div className="work-visual">
                <div className="work-logo-mark">
                  <img src={project.appIcon} alt={`${project.title} app icon`} />
                </div>
                <div className="work-company">
                  <span>{project.company}</span>
                  <strong>{project.period}</strong>
                </div>
              </div>

              <div className="work-info">
                <div className="work-title">
                  <h3>{`0${index + 1}`}</h3>
                  <div>
                    <h4>{project.title}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <p>{project.summary}</p>
                {project.products && (
                  <div className="work-product-grid">
                    {project.products.map((product) => (
                      <div className="work-product" key={product.name}>
                        <img src={product.icon} alt={`${product.name} icon`} />
                        <div>
                          <strong>{product.name}</strong>
                          <span>{product.detail}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <ul>
                  {project.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                <div className="work-tags">
                  {project.tools.map((tool) => (
                    <span key={tool}>{tool}</span>
                  ))}
                </div>
                {project.appUrl && (
                  <a
                    className="work-app-link"
                    href={project.appUrl}
                    target="_blank"
                    data-cursor="disable"
                  >
                    View on App Store
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
