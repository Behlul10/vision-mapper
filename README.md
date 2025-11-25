# Vision Mapper

Vision Mapper is an experimental playground for building a full MediaPipe-to-3D animation pipeline. The repository hosts multiple Vite + TypeScript prototypes that explore pose detection, landmark smoothing, and future Three.js rig animation work, alongside planning and documentation artifacts for the semester-long project.

## Repository Layout
- `mp-test/` – current primary Vite app with webcam pose tracking via `@mediapipe/tasks-vision`.
- `mp-pipeline-remake/` – fresh Vite scaffold intended for integrating Three.js and refined state management.
- `mediapipe-pipeline-test-demo/` – minimal standalone TypeScript demo that exercises the MediaPipe pipeline without Vite.
- `documents/` – project timeline, presentation material, and other planning docs.
- `journal/` – sprint reports, meeting notes, and reference write-ups.

## Prerequisites
- Node.js 20+ (aligns with modern Vite defaults).
- npm 10+ (ships with Node 20).
- A webcam for pose tracking demos.
- Modern Chromium-based browser for best MediaPipe WASM support.

## Running the Vite Apps
Each Vite project is isolated. Install and run them independently:

```bash
cd mp-test           # or mp-pipeline-remake
npm install
npm run dev
```

Then open the printed localhost URL. Grant camera permissions when prompted. Build and preview commands are also available through `npm run build` and `npm run preview`.

## Running the Standalone Demo
`mediapipe-pipeline-test-demo/` is a lightweight setup that reuses the shared MediaPipe task files located in `app/shared/models/`. Launch it with any static file server (e.g., `npx http-server`). When updating the `.task` models, keep the relative paths intact.

## Roadmap & Status
`documents/project-timeline.md` captures the week-by-week plan. Highlights:
- ✅ MediaPipe pose landmark detection inside Vite (`mp-test`).
- 🚧 Three.js skeleton mapping and animation (`mp-pipeline-remake`).
- 🔜 UI controls, export utilities, and presentation collateral.

## Useful References
- MediaPipe Tasks Vision docs: https://developers.google.com/mediapipe/solutions/vision/pose_landmarker/web_js
- Internal sprint notes: `journal/`
- Presentation outline: `documents/presentation.md`

Contributions, experiments, and documentation updates all happen directly in this repository—feel free to branch per prototype as the pipeline evolves.

