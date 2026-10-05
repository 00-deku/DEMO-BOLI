'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Shared plumbing for every three.js scene in the app: renderer, camera,
// resize, pointer tracking, pausing when off-screen, and cleanup.
//
// `setup(ctx)` builds the scene and returns optional callbacks:
//   { update(time, ctx), onResize(width, height), dispose() }
//
// Usage:
//   const mountRef = useThreeScene(buildMyScene);
//   return <div ref={mountRef} className={styles.canvas} />;
export default function useThreeScene(setup) {
  const mountRef = useRef(null);
  const setupRef = useRef(setup);
  setupRef.current = setup;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      // No WebGL: the CSS background behind the canvas still looks complete.
      mount.dataset.webgl = 'off';
      return undefined;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 200);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // pointer: -1..1 on both axes, smoothed toward target each frame.
    const ctx = {
      THREE,
      scene,
      camera,
      renderer,
      reduceMotion,
      pointer: { x: 0, y: 0 },
      pointerTarget: { x: 0, y: 0 },
      scroll: 0,
      size: { width: 1, height: 1 },
    };

    const api = setupRef.current(ctx) || {};

    const render = (time) => {
      ctx.pointer.x += (ctx.pointerTarget.x - ctx.pointer.x) * 0.05;
      ctx.pointer.y += (ctx.pointerTarget.y - ctx.pointer.y) * 0.05;
      if (api.update) api.update(time, ctx);
      renderer.render(scene, camera);
    };

    const resize = () => {
      const width = mount.clientWidth || 1;
      const height = mount.clientHeight || 1;
      ctx.size.width = width;
      ctx.size.height = height;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      if (api.onResize) api.onResize(width, height);
      if (reduceMotion) render(0);
    };

    const onPointer = (event) => {
      ctx.pointerTarget.x = (event.clientX / window.innerWidth) * 2 - 1;
      ctx.pointerTarget.y = -((event.clientY / window.innerHeight) * 2 - 1);
    };
    const onScroll = () => {
      ctx.scroll = window.scrollY;
    };

    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(mount);

    const ro = new ResizeObserver(resize);
    ro.observe(mount);
    resize();

    window.addEventListener('pointermove', onPointer, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    let frame = 0;
    const start = performance.now();
    const loop = () => {
      frame = requestAnimationFrame(loop);
      if (!visible || document.hidden) return;
      render((performance.now() - start) / 1000);
    };
    if (!reduceMotion) loop();

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('scroll', onScroll);
      if (api.dispose) api.dispose();
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => {
            if (material.map) material.map.dispose();
            material.dispose();
          });
        }
      });
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return mountRef;
}
