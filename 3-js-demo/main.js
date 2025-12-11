import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const loader = new GLTFLoader();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
const light = new THREE.DirectionalLight(0xffffff, 2); // White light, intensity 3
light.position.set(1, 1, 1);
scene.add(light);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 0.5, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff0 });
const cube = new THREE.Mesh(geometry, material);
cube.position.set(0.02, -0.5, 0);

scene.add(cube);

camera.position.z = 2.5;
camera.position.y = 2;
camera.lookAt(new THREE.Vector3(0, 1, 0));

let rightArm; // Declare variable

loader.load(
  "/models/xbot.glb",
  function (xbot) {
    scene.add(xbot.scene);

    // Use xbot.scene instead of 'model'
    xbot.scene.traverse(function (object) {
      if (object.isBone && object.name === "mixamorigRightArm") {
        rightArm = object; // Found it!
      }
    });
  },
  undefined,
  function (error) {
    console.error(error);
  },
);

function animate() {
  // cube.rotation.x += 0.0016;
  cube.rotation.y += 0.001;
  // 3. Wiggle it!
  if (rightArm) {
    rightArm.rotation.x = Math.sin(Date.now() / 500);
    rightArm.rotation.y = 2;
  }
  renderer.render(scene, camera);
}
