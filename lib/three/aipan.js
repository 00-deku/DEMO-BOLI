// Aipan mandala: rings of white dots and lotus petals, the way Aipan is
// drawn with rice paste (biswar) on red ochre (geru). The rings turn in
// opposite directions and the whole mandala tilts toward the pointer.

import { makeDotTexture } from './helpers.js';

function dotRing(THREE, radius, count, size, texture) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i += 1) {
    const a = (i / count) * Math.PI * 2;
    positions.set([Math.cos(a) * radius, Math.sin(a) * radius, 0], i * 3);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  return new THREE.Points(
    geometry,
    new THREE.PointsMaterial({ size, map: texture, color: '#fff7ec', transparent: true, depthWrite: false }),
  );
}

// One petal: two curves from an inner radius out to a tip.
function petalLoop(THREE, angle, inner, outer, spread, material) {
  const a0 = angle - spread;
  const a1 = angle + spread;
  const shape = new THREE.Shape();
  shape.moveTo(Math.cos(a0) * inner, Math.sin(a0) * inner);
  shape.quadraticCurveTo(
    Math.cos(a0) * outer * 0.9,
    Math.sin(a0) * outer * 0.9,
    Math.cos(angle) * outer,
    Math.sin(angle) * outer,
  );
  shape.quadraticCurveTo(
    Math.cos(a1) * outer * 0.9,
    Math.sin(a1) * outer * 0.9,
    Math.cos(a1) * inner,
    Math.sin(a1) * inner,
  );
  const geometry = new THREE.BufferGeometry().setFromPoints(shape.getPoints(24));
  return new THREE.LineLoop(geometry, material);
}

function petalRing(THREE, count, inner, outer, spread, offset = 0) {
  const group = new THREE.Group();
  const material = new THREE.LineBasicMaterial({ color: '#fff7ec', transparent: true, opacity: 0.9 });
  for (let i = 0; i < count; i += 1) {
    group.add(petalLoop(THREE, (i / count) * Math.PI * 2 + offset, inner, outer, spread, material));
  }
  return group;
}

function circle(THREE, radius, color, opacity = 1) {
  const points = [];
  for (let i = 0; i <= 128; i += 1) {
    const a = (i / 128) * Math.PI * 2;
    points.push(new THREE.Vector3(Math.cos(a) * radius, Math.sin(a) * radius, 0));
  }
  return new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(points),
    new THREE.LineBasicMaterial({ color, transparent: true, opacity }),
  );
}

export function buildAipan(ctx) {
  const { THREE, scene, camera, reduceMotion } = ctx;
  camera.position.set(0, 0, 14);
  camera.lookAt(0, 0, 0);

  const texture = makeDotTexture(THREE, { soft: 0.3 });
  const mandala = new THREE.Group();
  scene.add(mandala);

  // Centre bindu.
  const bindu = new THREE.Mesh(new THREE.CircleGeometry(0.35, 48), new THREE.MeshBasicMaterial({ color: '#f6a53a' }));
  mandala.add(bindu);

  const layers = [
    { node: dotRing(THREE, 0.8, 16, 0.26, texture), spin: 0.2 },
    { node: petalRing(THREE, 8, 1.0, 2.2, 0.32), spin: -0.08 },
    { node: dotRing(THREE, 2.6, 40, 0.22, texture), spin: 0.12 },
    { node: circle(THREE, 2.95, '#fff7ec', 0.8), spin: 0 },
    { node: petalRing(THREE, 16, 3.1, 4.6, 0.17, Math.PI / 16), spin: 0.05 },
    { node: dotRing(THREE, 5.0, 72, 0.2, texture), spin: -0.06 },
    { node: circle(THREE, 5.35, '#f6a53a', 0.9), spin: 0 },
    { node: petalRing(THREE, 24, 5.5, 6.6, 0.1), spin: -0.03 },
    { node: dotRing(THREE, 7.0, 120, 0.18, texture), spin: 0.025 },
    { node: dotRing(THREE, 7.5, 160, 0.12, texture), spin: -0.02 },
  ];
  layers.forEach(({ node }, i) => {
    node.position.z = i * 0.04;
    mandala.add(node);
  });

  return {
    onResize(width, height) {
      // Keep the whole mandala in frame on narrow screens.
      const aspect = width / height;
      camera.position.z = aspect < 1 ? 14 / aspect : 14;
    },
    update(time) {
      const { pointer } = ctx;
      mandala.rotation.x = -pointer.y * 0.35;
      mandala.rotation.y = pointer.x * 0.35;
      if (reduceMotion) return;
      layers.forEach(({ node, spin }) => {
        node.rotation.z = time * spin;
      });
      const breathe = 1 + Math.sin(time * 0.8) * 0.015;
      mandala.scale.setScalar(breathe);
      bindu.scale.setScalar(1 + Math.sin(time * 2) * 0.08);
    },
  };
}
