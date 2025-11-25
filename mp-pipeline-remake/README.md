# mp-pipeline-remake (WIP)

This directory hosts the next-generation Vite + TypeScript playground where the MediaPipe pose stream will be wired into a Three.js rig. It currently bootstraps the MediaPipe `PoseLandmarker` and basic DOM scaffolding, but the UI, drawing loop, and 3D scene are still a work in progress.

## Status
- ✅ Vite project scaffold with TypeScript strict mode.
- ✅ MediaPipe WASM runtime loading via `FilesetResolver.forVisionTasks("@mediapipe/tasks-vision@0.10.0/wasm")`.
- ✅ Local `public/models/pose_landmarker_full.task`.
- 🚧 Webcam controls, rendering loop, and Three.js integration.
- 🚧 Replacing placeholder DOM (counter + button) with actual controls.

## Run Locally

```bash
cd /Users/richardfeeen/Documents/GitHub/vision-mapper/mp-pipeline-remake
npm install
npm run dev          # Vite dev server at http://localhost:5173 by default
```

Grant webcam access when prompted. Once more functionality lands, `npm run build` + `npm run preview` will mimic production.

## File Map
- `src/main.ts` – sets up `PoseLandmarker` (currently targeting `"public/models/pose_landmarker_full.task"`), prepares video/canvas elements, and populates a temporary UI. The detection loop still needs to call `PoseLandmarker.detectForVideo` and draw to the canvas or forward data to Three.js.
- `public/models/pose_landmarker_full.task` – pose model copied from the MediaPipe package.
- `public/g-icon.png` – Google logo shown in the placeholder UI.
- `src/style.css` – inherits Vite defaults; expect significant changes once UI work begins.

## Next Steps
1. Replace the placeholder button/counter with start/stop controls for the webcam stream.
2. Wire `PoseLandmarker` results into a render loop that draws landmarks (via `DrawingUtils`) for debugging.
3. Introduce a Three.js scene to map the landmarks to a skeleton.
4. Add configuration UI (confidence thresholds, delegate selection, smoothing).

Document progress here as milestones land so collaborators know which pieces remain.***

