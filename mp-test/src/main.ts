import {
  FilesetResolver,
  PoseLandmarker,
  type PoseLandmarkerResult,
  DrawingUtils, // optional if you want to draw landmarks
} from "@mediapipe/tasks-vision";

async function main() {
  // Start with CDN WASM to simplify
  const filesetResolver = await FilesetResolver.forVisionTasks("/wasm");
  const landmarker = await PoseLandmarker.createFromOptions(filesetResolver, {
    baseOptions: {
      modelAssetPath: "/models/pose_landmarker_full.task",
      delegate: "GPU", // or "CPU"
    },
    runningMode: "VIDEO", // "IMAGE" or "LIVE_STREAM" also supported
    numPoses: 1,
    minPoseDetectionConfidence: 0.5,
    minPosePresenceConfidence: 0.5,
    minTrackingConfidence: 0.5,
    outputSegmentationMasks: false,
  });

  // Camera/canvas setup (same as before)
  const video = document.createElement("video");
  video.autoplay = true;
  video.playsInline = true;
  document.body.appendChild(video);

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  document.body.appendChild(canvas);

  async function setupCamera() {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { width: 640, height: 480 },
      audio: false,
    });
    video.srcObject = stream;
    await video.play();
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
  }

  await setupCamera();

  const drawer = new DrawingUtils(ctx);

  async function loop() {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const result: PoseLandmarkerResult = await landmarker.detectForVideo(
      video,
      performance.now(),
    );

    // Draw landmarks if present
    if (result.landmarks?.[0]) {
      drawer.drawLandmarks(result.landmarks[0], {
        radius: 2,
        color: "deepskyblue",
      });
      drawer.drawConnectors(
        result.landmarks[0],
        PoseLandmarker.POSE_CONNECTIONS,
        {
          lineWidth: 2,
          color: "lime",
        },
      );
    }

    requestAnimationFrame(loop);
  }

  loop();
}

main().catch((e) => {
  console.error(e);
  const pre = document.createElement("pre");
  pre.textContent = String(e?.stack || e);
  document.body.appendChild(pre);
});
