import * as THREE from "three";
import type { PoseLandmarkerResult } from "@mediapipe/tasks-vision";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const loader = new GLTFLoader();

export class Scene {
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    meshes: THREE.Mesh[] = [];
    rightArm: THREE.Object3D | undefined;
    rightForeArm: THREE.Object3D | undefined;
    leftArm: THREE.Object3D | undefined;
    leftForeArm: THREE.Object3D | undefined;
    arrow: THREE.ArrowHelper | undefined;

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
        // Load the character model
        const loader = new GLTFLoader();
        loader.load(
            "/models/xbot.glb", // Correct path (Vite serves public/ at root)
            (gltf) => {
                this.scene.add(gltf.scene);
                gltf.scene.scale.set(1, 1, 1); // Adjust scale if needed
                gltf.scene.position.set(0, -1, 0); // Move down to see feet

                // Traverse to find bones if you want to animate them later
                gltf.scene.traverse((object) => {
                    if (object.type === 'Bone') {
                        if (object.name === 'mixamorigRightArm') {
                            this.rightArm = object;
                        }
                        if (object.name === 'mixamorigRightForeArm') {
                            this.rightForeArm = object;
                        }
                        if (object.name === 'mixamorigLeftArm') {
                            this.leftArm = object;
                        }
                        if (object.name === 'mixamorigLeftForeArm') {
                            this.leftForeArm = object;
                        }
                    }
                });
            },
            undefined,
            (error) => {
                console.error("An error happened loading the model:", error);
            }
        );

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

        // --- RETARGETING LOGIC (Simple Puppet) ---
        // FIX MIRRORING: Since webcam is mirrored, "Left" on screen is "Right" in 3D space usually.
        // But for a "Digital Mirror", when I raise MY Right arm, the robot should raise IT'S Right arm (which is on the right side of the screen).
        // Let's swap the inputs: 
        // 11 = Left Shoulder, 13 = Left Elbow
        // 12 = Right Shoulder, 14 = Right Elbow

        // Let's try mapping Real Left (11/13) to Robot Right Arm to see if that fixes the "wrong arm" issue first.
        const shoulder = result.worldLandmarks[0][11]; // Was 12
        const elbow = result.worldLandmarks[0][13];    // Was 14

        if (this.rightArm && shoulder && elbow) {

            const shoulderPos = new THREE.Vector3(-shoulder.x, -shoulder.y, -shoulder.z);
            const elbowPos = new THREE.Vector3(-elbow.x, -elbow.y, -elbow.z);

            const direction = new THREE.Vector3().subVectors(elbowPos, shoulderPos).normalize();

            // FIX ANGLES: User confirmed (0, 0, 1) works best!
            const defaultDir = new THREE.Vector3(0, 0, 1);

            const quaternion = new THREE.Quaternion().setFromUnitVectors(defaultDir, direction);
            this.rightArm.quaternion.slerp(quaternion, 0.05); // Smoother (0.1 -> 0.05)
        }

        // --- LEFT ARM (Mirror of User's Right Arm) ---
        // 12 = Right Shoulder, 14 = Right Elbow
        const leftShoulder = result.worldLandmarks[0][12];
        const leftElbow = result.worldLandmarks[0][14];

        if (this.leftArm && leftShoulder && leftElbow) {
            const shoulderPos = new THREE.Vector3(-leftShoulder.x, -leftShoulder.y, -leftShoulder.z);
            const elbowPos = new THREE.Vector3(-leftElbow.x, -leftElbow.y, -leftElbow.z);

            const direction = new THREE.Vector3().subVectors(elbowPos, shoulderPos).normalize();

            // Assuming symmetry, Left Arm likely uses (0, 0, -1) or (0, 0, 1) depending on axis.
            // If Right Arm was (0,0,1), Left Arm is usually the same (if axes are consistent) or flipped.
            // Let's try SAME first: (0, 0, 1)
            const defaultDir = new THREE.Vector3(0, 0, 1);

            const quaternion = new THREE.Quaternion().setFromUnitVectors(defaultDir, direction);
            this.leftArm.quaternion.slerp(quaternion, 0.05); // Smoother
        }

        // --- FOREARMS ---
        // --- FOREARMS (The Hinge Approach) ---
        // Instead of trying to point the bone in 3D space (which breaks because of parent rotation),
        // we will simple calculate the "Bend Angle" at the elbow and apply it.

        // RIGHT ARM HINGE
        // We need the landmarks for the Hinge calc. 
        // Note: We used 'shoulder' and 'elbow' from the upper arm block, but they were scoped inside that block if we aren't careful.
        // Let's re-declare specific ones to be safe and clear.

        // FOR RIGHT ARM (Controlled by User's Left - Mirrored)
        // User Left Shoulder = 11, User Left Elbow = 13, User Left Wrist = 15
        const rShoulderLM = result.worldLandmarks[0][11];
        const rElbowLM = result.worldLandmarks[0][13];
        const rWristLM = result.worldLandmarks[0][15];

        if (this.rightForeArm && rShoulderLM && rElbowLM && rWristLM) {
            const shoulderPos = new THREE.Vector3(-rShoulderLM.x, -rShoulderLM.y, -rShoulderLM.z);
            const elbowPos = new THREE.Vector3(-rElbowLM.x, -rElbowLM.y, -rElbowLM.z);
            const wristPos = new THREE.Vector3(-rWristLM.x, -rWristLM.y, -rWristLM.z);

            // Vector 1: Upper Arm (Shoulder -> Elbow)
            const upperArmVec = new THREE.Vector3().subVectors(elbowPos, shoulderPos).normalize();
            // Vector 2: Forearm (Elbow -> Wrist)
            const foreArmVec = new THREE.Vector3().subVectors(wristPos, elbowPos).normalize();

            // Calculate the angle between them (0 to PI)
            let angle = upperArmVec.angleTo(foreArmVec);

            // Apply to the Hinge Axis (Usually Z or Y for Mixamo rigs)
            // Note: XBot T-Pose, bending elbow usually means rotating around Z or Y.
            // "Hail Hitler" suggests it's just pointing straight, meaning NO bend was visible or it bent backwards (clipping).
            // Let's try Z axis. Standard flexion is often +Z or -Z.
            // Manual lerp for the single float value since .rotateZ() is incremental/relative if used confusingly, 
            // but actually .rotation.z is absolute.
            // Let's simply LERP the value directly? 
            // Better: use ThreeJS mathUtils.lerp on the current rotation.

            // Current Rotation
            const currentRot = this.rightForeArm.rotation.z;
            const targetRot = angle;

            // Softening the change
            this.rightForeArm.rotation.z = THREE.MathUtils.lerp(currentRot, targetRot, 0.05);
            // removing the old reset/rotate logic which was jerky
        }

        // LEFT ARM HINGE (Controlled by User's Right - Mirrored)
        // User Right Shoulder = 12, User Right Elbow = 14, User Right Wrist = 16
        const lShoulderLM = result.worldLandmarks[0][12];
        const lElbowLM = result.worldLandmarks[0][14];
        const lWristLM = result.worldLandmarks[0][16];

        if (this.leftForeArm && lShoulderLM && lElbowLM && lWristLM) {
            const shoulderPos = new THREE.Vector3(-lShoulderLM.x, -lShoulderLM.y, -lShoulderLM.z);
            const elbowPos = new THREE.Vector3(-lElbowLM.x, -lElbowLM.y, -lElbowLM.z);
            const wristPos = new THREE.Vector3(-lWristLM.x, -lWristLM.y, -lWristLM.z);

            const upperArmVec = new THREE.Vector3().subVectors(elbowPos, shoulderPos).normalize();
            const foreArmVec = new THREE.Vector3().subVectors(wristPos, elbowPos).normalize();

            let angle = upperArmVec.angleTo(foreArmVec);

            const currentRot = this.leftForeArm.rotation.z;
            const targetRot = -angle; // Mirror

            this.leftForeArm.rotation.z = THREE.MathUtils.lerp(currentRot, targetRot, 0.05);
        }
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }
}
