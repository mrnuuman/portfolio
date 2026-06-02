import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three-stdlib";
import gsap from "gsap";
import { useLoading } from "../../context/LoadingProvider";
import { setProgress } from "../Loading";
import { setAllTimeline, setCharTimeline } from "../utils/GsapScroll";
import { publicAsset } from "../../utils/asset";
import {
  handleMouseMove,
  handleTouchEnd,
  handleTouchMove,
} from "./utils/mouseUtils";

const AVATAR_MODEL = publicAsset("models/muhammad-avatar.glb");
const AVATAR_BASE_Y = -4.0;

const fitModelIntoHero = (model: THREE.Object3D) => {
  const box = new THREE.Box3().setFromObject(model);
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();
  box.getSize(size);
  box.getCenter(center);

  model.position.sub(center);
  const maxDimension = Math.max(size.x, size.y, size.z, 0.001);
  const scale = 6.8 / maxDimension;
  model.scale.setScalar(scale);

  model.traverse((object) => {
    if (!(object instanceof THREE.Mesh)) return;
    object.castShadow = true;
    object.receiveShadow = true;

    const materials = Array.isArray(object.material) ? object.material : [object.material];
    materials.forEach((material) => {
      if ("transparent" in material && material.opacity < 1) {
        material.depthWrite = false;
      }
      material.needsUpdate = true;
    });
  });
};

const keepEyesOpen = (model: THREE.Object3D) => {
  model.traverse((object) => {
    if (!(object instanceof THREE.Mesh) || !object.morphTargetDictionary) return;

    Object.entries(object.morphTargetDictionary).forEach(([name, index]) => {
      const lowerName = name.toLowerCase();
      if (
        lowerName.includes("blink") ||
        lowerName.includes("closed") ||
        lowerName.includes("squint") ||
        lowerName.includes("lookdown")
      ) {
        object.morphTargetInfluences![index] = 0;
      }
      if (lowerName.includes("eyewide")) {
        object.morphTargetInfluences![index] = 0.16;
      }
    });
  });
};

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const { setLoading } = useLoading();

  useEffect(() => {
    if (!canvasDiv.current) return;

    let isMounted = true;
    const scene = new THREE.Scene();
    const rect = canvasDiv.current.getBoundingClientRect();
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(rect.width, rect.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    canvasDiv.current.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(28, rect.width / rect.height, 0.1, 100);
    camera.position.set(0, 0.12, 8.8);
    camera.lookAt(0, -0.25, 0);

    const ambient = new THREE.AmbientLight("#e8ddff", 1.35);
    const key = new THREE.DirectionalLight("#ffffff", 2.8);
    key.position.set(2.6, 4.4, 4.5);
    key.castShadow = true;
    const fill = new THREE.DirectionalLight("#c2a4ff", 1.25);
    fill.position.set(-3.5, 1.2, 3.2);
    const accent = new THREE.PointLight("#ff9fd2", 2.1, 8, 2);
    accent.position.set(-2.4, -0.4, 2.8);
    scene.add(ambient, key, fill, accent);

    const progress = setProgress((value) => setLoading(value));
    const root = new THREE.Group();
    root.name = "muhammad-avatar-root";
    root.position.set(0.02, AVATAR_BASE_Y, 0);
    root.rotation.set(0, 0.22, 0);

    const focusRig = new THREE.Group();
    focusRig.name = "spine005";
    focusRig.add(root);
    scene.add(focusRig);

    const mixerRef: { current: THREE.AnimationMixer | null } = { current: null };
    let avatarModel: THREE.Object3D | null = null;
    const followTargets: Array<{
      object: THREE.Object3D;
      baseQuaternion: THREE.Quaternion;
      strength: number;
    }> = [];
    const targetQuaternion = new THREE.Quaternion();
    const targetEuler = new THREE.Euler(0, 0, 0, "XYZ");
    const loader = new GLTFLoader();
    loader.load(
      AVATAR_MODEL,
      (gltf) => {
        if (!isMounted) return;

        const model = gltf.scene;
        model.name = "muhammad-avatar-model";
        fitModelIntoHero(model);
        keepEyesOpen(model);
        avatarModel = model;
        root.add(model);

        const head = model.getObjectByName("Head");
        const neck = model.getObjectByName("Neck");
        if (neck) {
          followTargets.push({
            object: neck,
            baseQuaternion: neck.quaternion.clone(),
            strength: 0.35,
          });
        }
        if (head) {
          followTargets.push({
            object: head,
            baseQuaternion: head.quaternion.clone(),
            strength: 1,
          });
        }

        if (gltf.animations.length > 0) {
          mixerRef.current = new THREE.AnimationMixer(model);
          gltf.animations.forEach((clip) => {
            mixerRef.current?.clipAction(clip).play();
          });
        }

        setCharTimeline(focusRig, camera);
        progress.loaded().then(() => {
          if (!isMounted) return;
          gsap.fromTo(
            root.scale,
            { x: 0.9, y: 0.9, z: 0.9 },
            { x: 1, y: 1, z: 1, duration: 1.2, ease: "power3.out" }
          );
        });
      },
      (event) => {
        if (event.total) {
          const loaded = Math.min(92, Math.round((event.loaded / event.total) * 92));
          setLoading(loaded);
        }
      },
      () => {
        progress.clear();
      }
    );
    setAllTimeline();

    let mouse = { x: 0, y: 0 };
    let interpolation = { x: 0.1, y: 0.2 };
    let frameId = 0;
    const clock = new THREE.Clock();

    const onMouseMove = (event: MouseEvent) => {
      handleMouseMove(event, (x, y) => {
        mouse = { x, y };
      });
    };

    let debounce: number | undefined;
    const onTouchStart = (event: TouchEvent) => {
      const element = event.target as HTMLElement;
      debounce = window.setTimeout(() => {
        element?.addEventListener("touchmove", (e: TouchEvent) =>
          handleTouchMove(e, (x, y) => {
            mouse = { x, y };
          })
        );
      }, 200);
    };

    const onTouchEnd = () => {
      handleTouchEnd((x, y, interpolationX, interpolationY) => {
        mouse = { x, y };
        interpolation = { x: interpolationX, y: interpolationY };
      });
    };

    const onResize = () => {
      if (!canvasDiv.current) return;
      const canvasRect = canvasDiv.current.getBoundingClientRect();
      renderer.setSize(canvasRect.width, canvasRect.height);
      camera.aspect = canvasRect.width / canvasRect.height;
      camera.updateProjectionMatrix();
    };

    document.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", onResize);
    const landingDiv = document.getElementById("landingDiv");
    landingDiv?.addEventListener("touchstart", onTouchStart);
    landingDiv?.addEventListener("touchend", onTouchEnd);

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      const delta = clock.getDelta();

      root.position.y = AVATAR_BASE_Y + Math.sin(elapsed * 0.8) * 0.03;
      accent.intensity = 1.7 + Math.sin(elapsed * 2.8) * 0.45;
      mixerRef.current?.update(delta);
      if (avatarModel) {
        keepEyesOpen(avatarModel);
      }

      const headX = THREE.MathUtils.clamp(-mouse.y * 0.26, -0.2, 0.22);
      const headY = THREE.MathUtils.clamp(mouse.x * 0.42, -0.38, 0.38);
      followTargets.forEach(({ object, baseQuaternion, strength }) => {
        targetEuler.set(headX * strength, headY * strength, 0);
        targetQuaternion.copy(baseQuaternion).multiply(
          new THREE.Quaternion().setFromEuler(targetEuler)
        );
        object.quaternion.slerp(targetQuaternion, interpolation.x);
      });

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      isMounted = false;
      window.clearTimeout(debounce);
      cancelAnimationFrame(frameId);
      document.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      landingDiv?.removeEventListener("touchstart", onTouchStart);
      landingDiv?.removeEventListener("touchend", onTouchEnd);
      progress.clear();
      gsap.killTweensOf(root.scale);
      mixerRef.current?.stopAllAction();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => material.dispose());
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [setLoading]);

  return (
    <div className="character-container">
      <div className="character-model" ref={canvasDiv}>
        <div className="character-hover" ref={hoverDivRef}></div>
      </div>
    </div>
  );
};

export default Scene;
