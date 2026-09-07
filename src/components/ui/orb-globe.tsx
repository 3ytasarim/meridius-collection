"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/**
 * Wireframe orb (adapted from 21st.dev "3d-orb"): a draggable, auto-rotating
 * sphere with an additive atmosphere glow. Recoloured to the Meridius purple —
 * the material slowly lerps through a set of purple tones. Contained (sizes to
 * its parent), transparent background, no textures, no starfield.
 */
export function OrbGlobe({ className = "" }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const getSize = () => ({
      w: mount.clientWidth || 1,
      h: mount.clientHeight || 1,
    });

    const scene = new THREE.Scene();
    const { w, h } = getSize();
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 1000);
    camera.position.z = 14;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.cursor = "grab";

    // Atmosphere glow (custom shader, additive)
    const atmosphereMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 glowColor;
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.62 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          gl_FragColor = vec4(glowColor, 1.0) * intensity;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
      uniforms: { glowColor: { value: new THREE.Color(0x7c45e8) } },
    });
    const glowUniform = atmosphereMaterial.uniforms["glowColor"];
    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(5.25, 32, 32),
      atmosphereMaterial,
    );
    scene.add(atmosphere);

    // Wireframe globe
    const wireMaterial = new THREE.MeshBasicMaterial({
      color: 0x7c45e8,
      wireframe: true,
      transparent: true,
      opacity: 0.55,
    });
    const wireframe = new THREE.Mesh(
      new THREE.SphereGeometry(5, 34, 34),
      wireMaterial,
    );
    scene.add(wireframe);

    // Faint solid core for depth
    const coreMaterial = new THREE.MeshPhongMaterial({
      color: 0x6330c7,
      transparent: true,
      opacity: 0.18,
      shininess: 40,
    });
    const core = new THREE.Mesh(
      new THREE.SphereGeometry(4.88, 48, 48),
      coreMaterial,
    );
    scene.add(core);

    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const point = new THREE.PointLight(0xffffff, 1);
    point.position.set(10, 10, 12);
    scene.add(point);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.rotateSpeed = 0.5;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = !prefersReduced;
    controls.autoRotateSpeed = 0.9;

    // Purple tones the material cycles through
    const tones = [
      new THREE.Color(0x6330c7),
      new THREE.Color(0x7c45e8),
      new THREE.Color(0xa77af4),
      new THREE.Color(0x8b5cf6),
      new THREE.Color(0xb794f6),
    ];
    let idx = 0;
    let next = 1;
    let t = 0;
    const speed = 0.004;
    const tmp = new THREE.Color();

    let raf = 0;
    const render = () => {
      raf = requestAnimationFrame(render);

      if (!prefersReduced) {
        t += speed;
        if (t >= 1) {
          t = 0;
          idx = next;
          next = (next + 1) % tones.length;
        }
        const a = tones[idx];
        const b = tones[next];
        if (a && b) {
          tmp.set(a).lerp(b, t);
          wireMaterial.color.copy(tmp);
          coreMaterial.color.copy(tmp);
          if (glowUniform) glowUniform.value.copy(tmp);
        }
        wireframe.rotation.y += 0.0012;
        core.rotation.y += 0.0012;
        atmosphere.rotation.y += 0.0006;
      }

      controls.update();
      renderer.render(scene, camera);
    };
    render();

    const ro = new ResizeObserver(() => {
      const s = getSize();
      camera.aspect = s.w / s.h;
      camera.updateProjectionMatrix();
      renderer.setSize(s.w, s.h);
    });
    ro.observe(mount);

    const onDown = () => (renderer.domElement.style.cursor = "grabbing");
    const onUp = () => (renderer.domElement.style.cursor = "grab");
    renderer.domElement.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      renderer.domElement.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      controls.dispose();
      renderer.dispose();
      wireframe.geometry.dispose();
      core.geometry.dispose();
      atmosphere.geometry.dispose();
      wireMaterial.dispose();
      coreMaterial.dispose();
      atmosphereMaterial.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className={className} aria-hidden />;
}

export default OrbGlobe;
