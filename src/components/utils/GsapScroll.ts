import * as THREE from "three";
import gsap from "gsap";

export function setCharTimeline(
  character: THREE.Object3D<THREE.Object3DEventMap> | null,
  camera: THREE.PerspectiveCamera
) {
  let intensity: number = 0;
  setInterval(() => {
    intensity = Math.random();
  }, 200);
  const tl1 = gsap.timeline({
    scrollTrigger: {
      trigger: ".landing-section",
      start: "top top",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });
  const tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: ".about-section",
      start: "center 55%",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });
  const hideCharacter = gsap.timeline({
    scrollTrigger: {
      trigger: ".whatIDO",
      start: "top 85%",
      end: "top 55%",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });
  let screenLight: any = null;
  let monitor: any = null;

  character?.getObjectByName("Plane004")?.traverse((object: any) => {
    if (!object.material) return;

    object.material.transparent = true;
    if (object.material.name === "Material.027") {
      monitor = object;
      object.material.color.set("#FFFFFF");
    }
  });

  const screenLightObject: any = character?.getObjectByName("screenlight");
  if (screenLightObject?.material) {
    screenLightObject.material.transparent = true;
    screenLightObject.material.opacity = 0;
    screenLightObject.material.emissive.set("#C8BFFF");
    gsap.timeline({ repeat: -1, repeatRefresh: true }).to(screenLightObject.material, {
      emissiveIntensity: () => intensity * 8,
      duration: () => Math.random() * 0.6,
      delay: () => Math.random() * 0.1,
    });
    screenLight = screenLightObject;
  }
  let neckBone = character?.getObjectByName("spine005");
  if (window.innerWidth > 1024) {
    if (character) {
      if (!monitor && !screenLight) {
        tl1
          .to(camera.position, { z: 9.2, y: 0.1, duration: 1 }, 0)
          .to(character.rotation, { y: 0.38, duration: 1, ease: "power2.inOut" }, 0)
          .fromTo(".character-model", { x: 0 }, { x: "-72%", duration: 1 }, 0)
          .to(".landing-container", { opacity: 0, duration: 0.4 }, 0)
          .to(".landing-container", { y: "40%", duration: 0.8 }, 0)
          .fromTo(".about-me", { y: "-50%" }, { y: "0%" }, 0);

        tl2
          .to(camera.position, { z: 9.6, y: 0.1, duration: 6, ease: "power3.inOut" }, 0)
          .to(character.rotation, { y: 0.38, duration: 6, ease: "power2.inOut" }, 0)
          .to(".about-section", { y: "22%", duration: 6 }, 0)
          .to(".about-section", { opacity: 0, delay: 3, duration: 2 }, 0)
          .fromTo(
            ".character-model",
            { pointerEvents: "inherit", opacity: 1, y: "0%" },
            { pointerEvents: "none", x: "-72%", y: "12%", opacity: 1, duration: 5 },
            0
          );

        hideCharacter.fromTo(
          ".character-model",
          { autoAlpha: 1 },
          { autoAlpha: 0, duration: 1, ease: "none" },
          0
        );
        return;
      }

      tl1
        .fromTo(character.rotation, { y: 0 }, { y: 0.7, duration: 1 }, 0)
        .to(camera.position, { z: 22 }, 0)
        .fromTo(".character-model", { x: 0 }, { x: "-25%", duration: 1 }, 0)
        .to(".landing-container", { opacity: 0, duration: 0.4 }, 0)
        .to(".landing-container", { y: "40%", duration: 0.8 }, 0)
        .fromTo(".about-me", { y: "-50%" }, { y: "0%" }, 0);

      tl2
        .to(
          camera.position,
          { z: 75, y: 8.4, duration: 6, delay: 2, ease: "power3.inOut" },
          0
        )
        .to(".about-section", { y: "30%", duration: 6 }, 0)
        .to(".about-section", { opacity: 0, delay: 3, duration: 2 }, 0)
        .fromTo(
          ".character-model",
          { pointerEvents: "inherit", opacity: 1 },
          { pointerEvents: "none", x: "-12%", opacity: 1, delay: 2, duration: 5 },
          0
        )
        .to(character.rotation, { y: 0.92, x: 0.12, delay: 3, duration: 3 }, 0);

      if (neckBone) {
        tl2.to(neckBone.rotation, { x: 0.6, delay: 2, duration: 3 }, 0);
      }

      if (monitor?.material) {
        tl2
          .to(monitor.material, { opacity: 1, duration: 0.8, delay: 3.2 }, 0)
          .fromTo(
            monitor.position,
            { y: -10, z: 2 },
            { y: 0, z: 0, delay: 1.5, duration: 3, immediateRender: false },
            0
          );
      }

      if (screenLight?.material) {
        tl2.to(screenLight.material, { opacity: 1, duration: 0.8, delay: 4.5 }, 0);
      }

      hideCharacter.fromTo(
        ".character-model",
        { autoAlpha: 1 },
        { autoAlpha: 0, duration: 1, ease: "none" },
        0
      );
    }
  } else {
    if (character) {
      const tM2 = gsap.timeline({
        scrollTrigger: {
          trigger: ".what-box-in",
          start: "top 70%",
          end: "bottom top",
        },
      });
      tM2.to(".what-box-in", { display: "flex", duration: 0.1, delay: 0 }, 0);
    }
  }
}

export function setAllTimeline() {
  const careerTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".career-section",
      start: "top 30%",
      end: "100% center",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });
  careerTimeline
    .fromTo(
      ".career-timeline",
      { maxHeight: "10%" },
      { maxHeight: "100%", duration: 0.5 },
      0
    )

    .fromTo(
      ".career-timeline",
      { opacity: 0 },
      { opacity: 1, duration: 0.1 },
      0
    )
    .fromTo(
      ".career-info-box",
      { opacity: 0 },
      { opacity: 1, stagger: 0.1, duration: 0.5 },
      0
    )
    .fromTo(
      ".career-dot",
      { animationIterationCount: "infinite" },
      {
        animationIterationCount: "1",
        delay: 0.3,
        duration: 0.1,
      },
      0
    );

  if (window.innerWidth > 1024) {
    careerTimeline.fromTo(
      ".career-section",
      { y: 0 },
      { y: "20%", duration: 0.5, delay: 0.2 },
      0
    );
  } else {
    careerTimeline.fromTo(
      ".career-section",
      { y: 0 },
      { y: 0, duration: 0.5, delay: 0.2 },
      0
    );
  }
}
