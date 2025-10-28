import "./style.css";
import gLogo from "/g-icon.png";

import {
  FilesetResolver,
  PoseLandmarker,
  type PoseLandmarkerResult,
  DrawingUtils,
} from "@mediapipe/tasks-vision";

let poseLandmarker: PoseLandmarker /*= undefined */;
let runningMode = "VIDEO";
let enableWebcamButton: HTMLButtonElement;
let webcamRunning: Boolean = false;
const videoHeight = "360px";
const videoWidth = "480px";
//We first create the task and perpare it to run inferences
const createPoseLandmarker = async () => {
  const vision = await FilesetResolver.forVisionTasks(
    "@mediapipe/tasks-vision@0.10.0/wasm",
  );
  poseLandmarker = await PoseLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: "public/models/pose_landmarker_full.task",
      delegate: "GPU",
    },
    runningMode: runningMode,
    numPoses: 2,
  });
};
createPoseLandmarker();

//get webcam footage from the HTML DOM context
const video = document.getElementById("webcam") as HTMLVideoElement;

//the canvas element is part of the DOM used for drawing
const canvasElement = document.createElement("canvas");
const canvasCtx = canvasElement.getContext("2d");
//const drawingUtils = new DrawingUtils(canvasCtx);

let update_counter = 0;
let i = 0;
while (i < 1) {
  update_counter++;
  i++;
}

update_counter++;
document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <a href="https://ai.google.dev/edge/mediapipe/solutions/vision/pose_landmarker/web_js" target="_blank">
      <img src="${gLogo}" class="logo" alt="Google logo" />
    </a>
    <h1>MediaPipe Pipeline Test Demonstration</h1>
    <p>Click on the MP Button to </p>
    <div class="card">
      <button /*id=""*/ type="button"></button>
    </div>

    <p>Count <span id="counter">${update_counter}</span></p>

  </div>
`;

//setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);
