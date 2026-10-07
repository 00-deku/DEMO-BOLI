# `lib/three/`: the three.js scenes

Each scene is a **plain function** with no React in it:

```js
export function buildSomething(ctx) {
  const { THREE, scene, camera, pointer, reduceMotion } = ctx;
  // ...add meshes to the scene...
  return {
    update(time, ctx) { /* runs every frame */ },
    onResize(width, height) { /* optional */ },
    dispose() { /* optional extra cleanup */ },
  };
}
```

`hooks/useThreeScene.js` calls it, creates the renderer, runs the loop and cleans up. Because the scene functions don't depend on React, you can open them in a bare HTML page to tweak them quickly.

| File | Scene |
| --- | --- |
| `hills.js` | Six layered Himalayan ridges (far, snow-capped peaks to near, dark foothills), a sun with halo rings, drifting clouds, falling marigold petals. The mountains are a static backdrop; only the sky moves. |
| `aipan.js` | An Aipan mandala: rings of white dots and lotus petals on red ochre. Rings counter-rotate, the mandala breathes and tilts toward the pointer. |
| `helpers.js` | `seededRandom` (same mountains every load), `makeDotTexture` (round sprite via 2D canvas), `lerp` |

## Adding a new scene

1. Create `lib/three/myScene.js` exporting `buildMyScene(ctx)`.
2. Create `components/three/MySceneCanvas.jsx`:
   ```jsx
   'use client';
   import useThreeScene from '@/hooks/useThreeScene';
   import { buildMyScene } from '@/lib/three/myScene';
   import styles from './Canvas.module.css';

   export default function MySceneCanvas() {
     const mountRef = useThreeScene(buildMyScene);
     return <div ref={mountRef} className={styles.canvas} aria-hidden="true" />;
   }
   ```
3. Put it inside any element with `position: relative`.

## Ideas used

- **Flat colour + fog:** `MeshBasicMaterial` ignores lights, so shapes look like paper cut-outs; `scene.fog` fades far ridges into the sky colour.
- **Real parallax:** ridges sit at different `z` depths, so moving the camera a little makes near layers move more than far ones.
- **Shapes from paths:** ridgelines and petals are `THREE.Shape` outlines turned into `ShapeGeometry` / `LineLoop`.

**Learn more:** [three.js manual](https://threejs.org/manual/) · [Discover three.js](https://discoverthreejs.com/) · [three.js cleanup](https://threejs.org/manual/#en/cleanup)
