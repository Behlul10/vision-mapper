# Vision Mapper Owner’s Manual

This manual explains how to operate, maintain, and extend the Vision Mapper prototypes. It is aimed at anyone who needs to demo the system, iterate on code, or hand it off to the next team.

---

## 1. System Overview
- **Goal:** Convert real-time MediaPipe pose landmarks into data suitable for animating 3D rigs (future Three.js integration).
- **Repositories inside:** multiple Vite apps (`mp-test`, `mp-pipeline-remake`) plus a static MediaPipe demo and planning docs/journals.
- **Primary demo:** `src/` – The completed Vision Mapper v1 with MediaPipe + Three.js + UI.
- **Legacy demo:** `mp-test` – reliable webcam pose tracking (no 3D).
- **Deprecated:** `mp-pipeline-remake` – older WIP folder.
- **Reference:** `mediapipe-pipeline-test-demo` – static TypeScript example mirroring official MediaPipe samples.

---

## 2. Hardware & Software Requirements
- macOS Sonoma or equivalent with a functioning webcam.
- Node.js 20+ (ships with npm 10+).
- Chromium-based browser (Chrome, Edge) for best WASM performance.
- Optional: external GPU not required; MediaPipe defaults to WebGPU/WebGL.

---

## 3. Directory Responsibilities
| Directory | Purpose | Notes |
| --- | --- | --- |
| `src/` | **Final Demo** | The main application. Run `npm run dev` here. |
| `mp-test/` | Legacy build | Keeps WASM + model files under `public/`; run via Vite. |
| `mp-pipeline-remake/` | Deprecated | Old WIP folder. |
| `mediapipe-pipeline-test-demo/` | Static TS demo | Uses CDN WASM, served via `http-server`. |
| `documents/` | Manuals, timelines, presentations | Update this manual + timeline before milestones. |
| `journal/` | Sprint reflections and references | Use for weekly status writing. |

---

## 4. Setup & Deployment

### 4.1 Initial Setup
```bash
git clone https://github.com/Behlul10/vision-mapper.git
cd vision-mapper
npm install --prefix mp-test
npm install --prefix mp-pipeline-remake
npm install --prefix mediapipe-pipeline-test-demo
```

### 4.2 Running the Main Demo (`src/`)
```bash
cd src
npm run dev
# open http://localhost:5173 and allow webcam
```
Use this build during live demos. It has the 3D skeleton and UI controls.

### 4.3 Running Legacy Demo (`mp-test`)
```bash
cd mp-test
npm run dev
```

### 4.3 Running Experimental Build (`mp-pipeline-remake`)
```bash
cd mp-pipeline-remake
npm run dev
```
Expect placeholder UI until the Three.js scene is complete.

### 4.4 Running Static Demo
```bash
cd mediapipe-pipeline-test-demo
npx http-server .
```
The page auto-loads `index.ts`; refresh after granting camera access.

---

## 5. Operating Procedures
1. **Before Demo Day**
   - Pull latest `main`.
   - Run `npm run dev` inside `mp-test`.
   - Verify the webcam stream and overlay for at least 30 seconds.
2. **During Demo**
   - Keep dev server tab focused; use OBS or QuickTime only if needed.
   - Mention that `mp-pipeline-remake` is in progress to set expectations.
3. **After Demo**
   - Stop the dev server (`Ctrl+C`).
   - Commit any documentation updates (timeline, manual, README).

---

## 6. Maintenance Checklist
- **Weekly**
  - Update `documents/project-timeline.md`.
  - Log sprint notes in `journal/`.
  - Sync npm dependencies (`npm outdated`).
- **Before Milestones**
  - Run `npm run build` for both Vite apps to ensure bundler compatibility.
  - Re-download `.task` models if Google updates the files.
  - Test on another machine/browser to catch permission quirks.

---

## 7. Troubleshooting
| Symptom | Likely Cause | Fix |
| --- | --- | --- |
| Blank video / no webcam | Browser blocked camera | Re-enable permissions in browser settings. |
| WASM fails to load in `mp-test` | Wrong `filesetResolver` path | Ensure `public/wasm` folder exists and restart Vite. |
| Static demo throws module errors | Node modules missing | Run `npm install` in `mediapipe-pipeline-test-demo`. |
| High CPU usage | Running multiple dev servers | Stop unused Vite instances; close extra tabs. |

---

## 8. Extension Guidelines
- Document major changes in this manual plus per-directory READMEs.
- For new demos, fork an existing Vite app and add a README immediately.
- When adding Three.js code, include screenshots/gifs under `documents/documentation-and-iterations/`.

---

## 9. Handoff Checklist
- [ ] Manual updated with the latest architecture notes.
- [ ] `mp-test` demo verified.
- [ ] `mp-pipeline-remake` status summarized in README.
- [ ] Journal entries up-to-date for the last sprint.
- [ ] Presentation slides synchronized with timeline.

---

## 10. Contacts & Resources
- Project owner: Behlul Vardal
- Repo: https://github.com/Behlul10/vision-mapper
- MediaPipe Docs: https://developers.google.com/mediapipe/solutions/vision/pose_landmarker/web_js

Keep this manual in sync with reality; small updates after each sprint prevent confusion when handing the project off or presenting progress.***

