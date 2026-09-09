"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Gravitational wireframe mesh backdrop (adapted from 21st.dev "retrying" /
 * GravitationalMeshHero). Contained to its parent (not the full window),
 * transparent, recoloured to the Meridius purple. The plane ripples gently and
 * warps toward the pointer.
 */
export function GravitationalMesh({ className = "" }: { className?: string }) {
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
    const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    mount.appendChild(renderer.domElement);

    // start far outside the plane so nothing shows until the pointer moves
    const pointer = new THREE.Vector2(-8, -8);
    const clock = new THREE.Clock();

    const geometry = new THREE.PlaneGeometry(40, 40, 56, 56);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(-8, -8) },
        uColorA: { value: new THREE.Color(0x7c45e8) },
        uColorB: { value: new THREE.Color(0xa77af4) },
      },
      vertexShader: `
        uniform float uTime;
        uniform vec2 uMouse;
        varying float vIntensity;

        void main() {
          vec3 pos = position;
          float mouseDist = distance(pos.xy, uMouse * 20.0);

          // only the area around the pointer lights up
          float warp = 1.0 - smoothstep(0.0, 6.5, mouseDist);
          pos.z += warp * 3.0;

          // gentle idle ripple of the geometry (does not affect visibility)
          float wave = sin(pos.x * 0.45 + uTime * 0.5) * cos(pos.y * 0.4 - uTime * 0.35);
          pos.z += wave * 0.25;

          vIntensity = warp;

          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColorA;
        uniform vec3 uColorB;
        varying float vIntensity;
        void main() {
          vec3 col = mix(uColorB, uColorA, vIntensity);
          gl_FragColor = vec4(col, vIntensity * 0.9);
        }
      `,
      wireframe: true,
      transparent: true,
      blending: THREE.NormalBlending,
      depthWrite: false,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -0.2;
    scene.add(mesh);

    const uMouse = material.uniforms["uMouse"];
    const uTime = material.uniforms["uTime"];

    const onPointerMove = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    let raf = 0;
    const render = () => {
      raf = requestAnimationFrame(render);
      const t = clock.getElapsedTime();
      if (uTime) uTime.value = prefersReduced ? 0 : t;
      if (uMouse) uMouse.value.lerp(pointer, prefersReduced ? 1 : 0.05);
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

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className={className} aria-hidden />;
}

export default GravitationalMesh;
