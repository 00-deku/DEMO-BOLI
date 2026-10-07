// Hero scene: layered Himalayan ridges at dusk, painted flat like a
// paper cut-out. The mountains are a static backdrop; only the sky moves
// (sun halo, drifting clouds, falling marigold petals).

import { lerp, makeDotTexture, seededRandom } from './helpers.js';

// Back to front. `sharp` makes pointy Himalayan peaks; low values give
// rolling foothills. `snow` adds white caps above that height.
const RIDGES = [
  { z: -40, base: 2.5, height: 11, sharp: 1, seed: 11, color: '#f1c09a', snow: 9.5, spacing: 9 },
  { z: -28, base: 1.8, height: 5.5, sharp: 0.75, seed: 23, color: '#e98f52', spacing: 7 },
  { z: -18, base: 0.8, height: 3.4, sharp: 0.45, seed: 37, color: '#d4582a' },
  { z: -11, base: -0.2, height: 2.4, sharp: 0.3, seed: 41, color: '#9f3519' },
  { z: -5, base: -1.4, height: 2.6, sharp: 0.2, seed: 53, color: '#5a2414' },
  { z: -0.5, base: -2.6, height: 1.9, sharp: 0.12, seed: 67, color: '#26110a' },
];

const CAMERA = { x: 0, y: 1.6, z: 12 };

// Height profile of one ridge: a mix of rolling sine hills and jagged
// triangular peaks placed at random.
function ridgeHeights(ridge, width, steps) {
  const rand = seededRandom(ridge.seed);
  const f1 = 0.06 + rand() * 0.04;
  const f2 = 0.17 + rand() * 0.08;
  const f3 = 0.45 + rand() * 0.2;
  const p1 = rand() * 10;
  const p2 = rand() * 10;
  const p3 = rand() * 10;

  const spacing = ridge.spacing || 6;
  const peaks = [];
  for (let x = -width / 2; x < width / 2; x += spacing * (0.6 + rand() * 0.8)) {
    peaks.push({ x, h: 0.35 + rand() * 0.65, w: spacing * (0.5 + rand() * 0.6) });
  }

  const points = [];
  for (let i = 0; i <= steps; i += 1) {
    const x = -width / 2 + (width * i) / steps;
    const soft = 0.5 + 0.25 * Math.sin(x * f1 + p1) + 0.15 * Math.sin(x * f2 + p2) + 0.1 * Math.sin(x * f3 + p3);
    let jagged = 0.1;
    peaks.forEach((peak) => {
      const t = 1 - Math.abs(x - peak.x) / peak.w;
      if (t > 0) jagged = Math.max(jagged, peak.h * t ** 1.3);
    });
    jagged += Math.sin(x * 3.1 + p3) * 0.015 + Math.sin(x * 7.3) * 0.008;
    points.push([x, ridge.base + ridge.height * lerp(soft, jagged, ridge.sharp)]);
  }
  return points;
}

function ridgeMesh(THREE, ridge, heights) {
  const shape = new THREE.Shape();
  const left = heights[0][0];
  const right = heights[heights.length - 1][0];
  shape.moveTo(left, -30);
  heights.forEach(([x, y]) => shape.lineTo(x, y));
  shape.lineTo(right, -30);
  shape.closePath();
  const mesh = new THREE.Mesh(
    new THREE.ShapeGeometry(shape),
    new THREE.MeshBasicMaterial({ color: ridge.color }),
  );
  mesh.position.z = ridge.z;
  return mesh;
}

function snowMesh(THREE, ridge, heights) {
  // Upper edge follows the ridge; lower edge sits a little below it, but
  // only where the ridge rises above the snow line.
  const depth = 1.6;
  const shape = new THREE.Shape();
  shape.moveTo(heights[0][0], heights[0][1]);
  heights.forEach(([x, y]) => shape.lineTo(x, y));
  for (let i = heights.length - 1; i >= 0; i -= 1) {
    const [x, y] = heights[i];
    const wobble = Math.sin(x * 2.3) * 0.15;
    const lower = y > ridge.snow ? Math.max(ridge.snow + wobble, y - depth) : y;
    shape.lineTo(x, lower);
  }
  shape.closePath();
  const mesh = new THREE.Mesh(
    new THREE.ShapeGeometry(shape),
    new THREE.MeshBasicMaterial({ color: '#fff7ec' }),
  );
  mesh.position.z = ridge.z + 0.01;
  return mesh;
}

function cloud(THREE, rand, color) {
  const group = new THREE.Group();
  const material = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.92 });
  const puffs = 4 + Math.floor(rand() * 3);
  for (let i = 0; i < puffs; i += 1) {
    const r = 0.5 + rand() * 0.6;
    const puff = new THREE.Mesh(new THREE.CircleGeometry(r, 32), material);
    puff.position.set(i * 0.75 - puffs * 0.35, Math.sin(i * 1.3) * 0.25 + r * 0.3, 0);
    group.add(puff);
  }
  // Flat bottom, like a painted cloud.
  const base = new THREE.Mesh(new THREE.PlaneGeometry(puffs * 0.8, 0.5), material);
  base.position.y = -0.1;
  group.add(base);
  return group;
}

export function buildHills(ctx) {
  const { THREE, scene, camera, reduceMotion } = ctx;

  camera.position.set(CAMERA.x, CAMERA.y, CAMERA.z);
  camera.lookAt(0, CAMERA.y, 0);
  scene.fog = new THREE.Fog('#f8cf9c', 25, 90);

  const world = new THREE.Group();
  scene.add(world);

  // Sun with soft halo rings.
  const sun = new THREE.Group();
  sun.add(new THREE.Mesh(new THREE.CircleGeometry(3.2, 64), new THREE.MeshBasicMaterial({ color: '#f9d27a', fog: false })));
  [4.4, 5.8, 7.4].forEach((r, i) => {
    sun.add(
      new THREE.Mesh(
        new THREE.RingGeometry(r, r + 0.18, 96),
        new THREE.MeshBasicMaterial({ color: '#fbe2b0', transparent: true, opacity: 0.45 - i * 0.12, fog: false }),
      ),
    );
  });
  sun.position.set(30, 17, -70);
  world.add(sun);

  // Clouds drifting between the far ridges.
  const rand = seededRandom(7);
  const clouds = [];
  for (let i = 0; i < 5; i += 1) {
    const c = cloud(THREE, rand, i % 2 ? '#fff3e2' : '#fde3c4');
    const z = -30 + rand() * 12;
    c.position.set(-25 + rand() * 50, 6 + rand() * 4, z);
    c.scale.setScalar(1 + rand() * 1.2);
    c.userData.speed = 0.15 + rand() * 0.25;
    clouds.push(c);
    world.add(c);
  }

  // Ridges.
  RIDGES.forEach((ridge) => {
    const distance = CAMERA.z - ridge.z;
    const width = distance * 2.6 + 30;
    const heights = ridgeHeights(ridge, width, 220);
    const group = new THREE.Group();
    group.add(ridgeMesh(THREE, ridge, heights));
    if (ridge.snow) group.add(snowMesh(THREE, ridge, heights));
    world.add(group);
  });

  // Marigold petals and dust motes.
  const COUNT = 260;
  const positions = new Float32Array(COUNT * 3);
  const colors = new Float32Array(COUNT * 3);
  const seeds = new Float32Array(COUNT);
  const palette = ['#f6a53a', '#f07a26', '#c4271b', '#fff3e2'].map((c) => new THREE.Color(c));
  for (let i = 0; i < COUNT; i += 1) {
    positions[i * 3] = (rand() - 0.5) * 30;
    positions[i * 3 + 1] = rand() * 14 - 3;
    positions[i * 3 + 2] = -8 + rand() * 16;
    const color = palette[Math.floor(rand() * palette.length)];
    colors.set([color.r, color.g, color.b], i * 3);
    seeds[i] = rand() * 100;
  }
  const petalGeometry = new THREE.BufferGeometry();
  petalGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  petalGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  const petals = new THREE.Points(
    petalGeometry,
    new THREE.PointsMaterial({
      size: 0.14,
      map: makeDotTexture(THREE),
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      fog: false,
    }),
  );
  scene.add(petals);

  return {
    // The camera and ridges stay still: the mountains are a static backdrop.
    // Only the sky moves (sun halo, clouds, falling petals).
    update(time) {
      if (!reduceMotion) {
        sun.rotation.z = time * 0.03;
        clouds.forEach((c) => {
          c.position.x += c.userData.speed * 0.01;
          if (c.position.x > 30) c.position.x = -30;
        });
        const pos = petalGeometry.attributes.position;
        for (let i = 0; i < COUNT; i += 1) {
          let y = pos.getY(i) - 0.006 - (seeds[i] % 1) * 0.008;
          if (y < -4) y = 11;
          pos.setY(i, y);
          pos.setX(i, pos.getX(i) + Math.sin(time * 0.8 + seeds[i]) * 0.004);
        }
        pos.needsUpdate = true;
      }
    },
  };
}
