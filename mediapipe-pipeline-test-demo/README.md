# mediapipe-pipeline-test-demo

This directory contains a minimal TypeScript demo that can be served as static files—no Vite bundler required. It wires MediaPipe’s `PoseLandmarker` directly in the browser to validate image-on-click detection and live webcam streaming before the logic was moved into the Vite apps.

## Run

```bash
cd /Users/richardfeeen/Documents/GitHub/vision-mapper/mediapipe-pipeline-test-demo
npm install              # installs @mediapipe/tasks-vision
npx http-server .        # or npx serve .
```

Open the printed localhost URL (default http://127.0.0.1:8080). Grant camera permissions when asked.

## File Highlights
- `index.html` – basic HTML shell that loads `index.ts`.
- `index.ts` – contains two demos:
  - image click detection that draws a canvas overlay per image,
  - live webcam detection using `detectForVideo`.
- `app/shared/models/pose_landmarker_full.task` – MediaPipe model pulled from Google’s storage bucket for offline use. Keep the relative path stable since the script references it.

## Notes
- Because this is served statically, the script imports directly from `./node_modules/@mediapipe/tasks-vision`. If that ever breaks, switch to an import map or bundle with Vite.
- WASM assets are fetched from the CDN (`https://cdn.jsdelivr.net/...`). Update to the pinned version you trust before demos.
- This repo copy is read-only during presentations; do experiments in `mp-test/` or `mp-pipeline-remake/` if you need bundler features or TypeScript tooling.

