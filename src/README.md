# Vision Mapper

A web application that uses **MediaPipe** to track body poses from a webcam and mirrors them in a **Three.js** 3D scene. The application includes a UI for capturing poses and copying them as PNG images.

## Features

### 👁️ Vision
- **MediaPipe Integration**: Uses `@mediapipe/tasks-vision` to detect 33 body landmarks in real-time.
- **Webcam Feed**: Displays a mirrored webcam preview.

### 🌍 Scene
- **Three.js Rendering**: A 3D scene with a dark background and lighting.
- **Skeleton Visualization**: Represents body joints as green spheres.
- **Smoothing**: Implemented Linear Interpolation (Lerp) to reduce webcam jitter for fluid movement.
- **Screenshot Ready**: Configured to allow high-quality image capture.

### 🎮 Controls
- **Capture Pose**: Triggers a 3-second countdown and freezes the scene.
- **Copy as PNG**: Converts the 3D canvas to a PNG image and copies it to the clipboard.

## How to Run

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Start the Dev Server**:
    ```bash
    npm run dev
    ```

3.  **Open in Browser**:
    Click the link shown in the terminal (usually `http://localhost:5173`).

## Usage

1.  **Allow Camera**: Grant permission for the browser to access your webcam.
2.  **Move**: Stand back and move around. The green skeleton will mimic your movements.
3.  **Capture**: Click **📸 Capture Pose**.
4.  **Pose**: You have 3 seconds to strike a pose before the screen freezes.
5.  **Copy**: Click **📋 Copy PNG** and paste it into Discord, Slack, or any image editor.
6.  **Retake**: Click **🔄 Retake** to unfreeze and try again.

## Project Structure

- `src/main.ts`: Main entry point, orchestrates the loop and connects components.
- `src/vision.ts`: Handles webcam and AI tracking.
- `src/scene.ts`: Handles 3D rendering and skeleton updates.
- `src/ui.ts`: Manages buttons and countdown logic.
