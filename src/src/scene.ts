import * as THREE from "three";
import type { PoseLandmarkerResult } from "@mediapipe/tasks-vision";

export class Scene {
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    meshes: THREE.Mesh[] = [];

    constructor() {
        //setup a 3D world
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x202020); // Dark grey background

        //setting up cam position
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.x = 0;
        this.camera.position.z = 4;
        this.camera.position.y = 0.5;

        //setting up renderer
        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, preserveDrawingBuffer: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        // Attach to HTML container
        const container = document.getElementById('3d-container');
        if (container) {
            container.appendChild(this.renderer.domElement);
        }

        //Lighting
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(0, 10, 10);
        this.scene.add(light);
        this.scene.add(new THREE.AmbientLight(0x404040));

        // Creating a simple "Skeleton" from spheres
        // MP detects 33 landmarks, so we make 33 spheres
        const geometry = new THREE.SphereGeometry(0.02, 16, 16);
        const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });

        for (let i = 0; i < 33; i++) {
            const sphere = new THREE.Mesh(geometry, material);
            this.scene.add(sphere);
            this.meshes.push(sphere);
        }
    }
    updateLandmarks(result: PoseLandmarkerResult) {
        if (!result.worldLandmarks || result.worldLandmarks.length === 0) return;

        // We only care about the first person detected
        const landmarks = result.worldLandmarks[0];

        // Loop through each landmark and move our corresponding sphere
        for (let i = 0; i < landmarks.length; i++) {
            const landmark = landmarks[i];
            const mesh = this.meshes[i];

            // Check visibility using the normalized landmarks (which usually carry the reliable visibility score)
            // Or use the one from worldLandmarks if available.
            // result.landmarks[0][i].visibility is the standard way to check.
            const visibility = result.landmarks && result.landmarks[0] && result.landmarks[0][i]
                ? result.landmarks[0][i].visibility ?? 1
                : 1;

            if (mesh) {
                // If visibility is too low (e.g. < 0.5), hide the mesh to avoid jitter
                if (visibility < 0.5) {
                    mesh.visible = false;
                    continue; // Skip position update
                } else {
                    mesh.visible = true;
                }

                const target = new THREE.Vector3(-landmark.x, -landmark.y, -landmark.z);
                mesh.position.lerp(target, 0.3);
            }
        }
    }
    render() {
        this.renderer.render(this.scene, this.camera);
    }
}