# mp-test

`mp-test` is the current Vite + TypeScript prototype for the Vision Mapper project. It streams webcam footage, runs MediaPipe’s `PoseLandmarker` in real time, and draws landmarks/connectors onto an HTML canvas for quick verification before wiring the data into Three.js.

## Quick Start

```bash
cd /Users/richardfeeen/Documents/GitHub/vision-mapper/mp-test
npm install          # installs Vite/TypeScript + @mediapipe/tasks-vision
npm run dev          # launches Vite dev server (default http://localhost:5173)
```

Open the printed URL, grant webcam access, and you should see the live video with pose lines rendered on top. When you’re ready to test a production build, run `npm run build` followed by `npm run preview`.

## Project Layout
- `src/main.ts` – bootstraps the webcam, loads the WASM runtime via `FilesetResolver.forVisionTasks("/wasm")`, and runs `PoseLandmarker.detectForVideo` each animation frame while drawing landmarks/connectors with `DrawingUtils`.
- `public/models/pose_landmarker_full.task` – local copy of the MediaPipe model referenced by `modelAssetPath`.
- `public/wasm/` – the WASM binaries copied from the MediaPipe package so the app can run offline; the `"/wasm"` prefix in `main.ts` points here.
- `src/style.css` + `src/counter.ts` – default Vite scaffolding (safe to delete once a UI framework lands).

## Notes & Next Steps
- Tune `PoseLandmarker` options in `src/main.ts` if you need more poses, different confidences, or CPU fallback.
- Keep the `.task` file and WASM assets under `public/` so Vite copies them verbatim.
- Next milestone: feed the `PoseLandmarkerResult` into a Three.js skeleton to validate landmark-to-bone mapping.

