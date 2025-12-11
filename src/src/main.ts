import "./style.css";
import { Vision } from "./vision";
import { Scene } from "./scene";
import { UI } from "./ui";
/*
 * We need 3 things from out html
 * A canvas for webcam video
 * A container for our 3D world
 * A container for our buttons (UI)
 */
document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div id="container">
    <canvas id="output_canvas"></canvas>
    <div id="3d-container"></div>
    <div id="ui-container"></div>
  </div>
`;
//intilize components
const vision = new Vision();
const scene = new Scene();
const ui = new UI();
const canvas = document.getElementById("output_canvas") as HTMLCanvasElement;

let paused = false;

//unpause when capture is clicked
ui.captureBtn.addEventListener("click", () => {
  paused = false;
});

//when countdown finishes, freeze
ui.onCaptureComplete = () => {
  paused = true;
};

//copy to clipboard
ui.onCopy = () => {
  scene.renderer.domElement.toBlob((blob) => {
    if (!blob) return; // <--- Stop if there's no image

    const item = new ClipboardItem({ "image/png": blob });
    navigator.clipboard
      .write([item])
      .then(() => {
        ui.copyBtn.innerText = "Copied!";
        setTimeout(() => {
          ui.copyBtn.innerText = "Copy PNG";
        }, 2000);
      })
      .catch((err) => console.error("Copy failed:", err));
  });
};

async function init() {
  await vision.initialize();
  await vision.startWebcam(canvas);

  loop(); //start the loop
}

function loop() {
  //draw the webcam preview to the corner box
  vision.drawVideo(canvas);

  //only update the skeleton if not paused
  if (!paused) {
    //detect pose
    const result = vision.detect();
    if (result && result.landmarks.length > 0) {
      scene.updateLandmarks(result);
    }
  }

  scene.render();
  requestAnimationFrame(loop);
}

init();
