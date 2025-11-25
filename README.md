# Vision Mapper

Vision Mapper is an experimental playground for building a full MediaPipe-to-3D animation pipeline. The repository hosts multiple Vite + TypeScript prototypes that explore pose detection, landmark smoothing, and future Three.js rig animation work, alongside planning and documentation artifacts for the semester-long project.

## Repository Layout
- `mp-test/` – current presentation-ready Vite app with webcam pose tracking via `@mediapipe/tasks-vision`.
- `mp-pipeline-remake/` – active work-in-progress aiming to integrate Three.js and better state management.
- `mediapipe-pipeline-test-demo/` – minimal standalone TypeScript demo that exercises the MediaPipe pipeline without Vite.
- `documents/` – project timeline, presentation material, and other planning docs. See the [owner’s manual](documents/owners-manual.md) for detailed operating procedures.
- `journal/` – sprint reports, meeting notes, and reference write-ups.
- `documents/owners-manual.md` – operator handbook with setup, demo, and maintenance procedures.

## Prototype Status
| Directory | Status | Notes |
| --- | --- | --- |
| `mp-test/` | ✅ Demo-ready | Use this during presentations; README includes run instructions and explains the WASM/model layout. |
| `mp-pipeline-remake/` | 🚧 In progress | Three.js skeleton + richer UI planned; README tracks remaining tasks. |
| `mediapipe-pipeline-test-demo/` | 🧪 Reference | Static TypeScript demo that mirrors MediaPipe docs; see its README for `http-server` instructions. |

## Prerequisites
- Node.js 20+ (aligns with modern Vite defaults).
- npm 10+ (ships with Node 20).
- A webcam for pose tracking demos.
- Modern Chromium-based browser for best MediaPipe WASM support.

## Running the Vite Apps
Each Vite project is isolated. Install and run them independently (see the per-directory READMEs for details):

```bash
cd mp-test           # or mp-pipeline-remake
npm install
npm run dev
```

Then open the printed localhost URL. Grant camera permissions when prompted. Build and preview commands are also available through `npm run build` and `npm run preview`.

## Running the Standalone Demo
`mediapipe-pipeline-test-demo/` is a lightweight setup that reuses the shared MediaPipe task files located in `app/shared/models/`. Launch it with any static file server (e.g., `npx http-server`). See `mediapipe-pipeline-test-demo/README.md` for the exact steps and notes about CDN-loaded WASM.

## Roadmap & Status
`documents/project-timeline.md` captures the week-by-week plan. Highlights:
- ✅ MediaPipe pose landmark detection inside Vite (`mp-test`).
- 🚧 Three.js skeleton mapping and animation (`mp-pipeline-remake`).
- 🔜 UI controls, export utilities, and presentation collateral.

## Useful References
- MediaPipe Tasks Vision docs: https://developers.google.com/mediapipe/solutions/vision/pose_landmarker/web_js
- Internal sprint notes: `journal/`
- Presentation outline: `documents/presentation.md`
- Owner’s manual: [documents/owners-manual.md](documents/owners-manual.md)

Contributions, experiments, and documentation updates all happen directly in this repository—feel free to branch per prototype as the pipeline evolves.

