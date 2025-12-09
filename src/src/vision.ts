import {
    FilesetResolver,
    PoseLandmarker,
    type PoseLandmarkerResult,
} from "@mediapipe/tasks-vision";

export class Vision {
    poseLandmarker: PoseLandmarker | undefined;
    webcamRunning: boolean = false;
    video: HTMLVideoElement;
    lastVideoTime = -1;

    //getting the video element
    constructor() {
        this.video = document.createElement("video");
        this.video.autoplay = true;
        this.video.playsInline = true;
    }

    async initialize() {
        //getting the web assembly vision tasks
        const vision = await FilesetResolver.forVisionTasks(
            "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm",
        );
        //setting up the landmarkers setting (GPU, poses, video)
        this.poseLandmarker = await PoseLandmarker.createFromOptions(vision, {
            baseOptions: {
                modelAssetPath:
                    "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_full/float16/1/pose_landmarker_full.task", delegate: "GPU",
            },
            runningMode: "VIDEO",
            numPoses: 1,
        });
    }

    async startWebcam(videoElement: HTMLCanvasElement) {
        if (!this.poseLandmarker) {
            console.warn("PoseLandmarker not loaded yet.");
            return;
        }
        //processing web cam
        const stream = await navigator.mediaDevices.getUserMedia({
            video: { width: 1280, height: 720 },
        });
        this.video.srcObject = stream;
        this.video.addEventListener("loadeddata", () => {
            this.webcamRunning = true;
        });
    }

    detect(): PoseLandmarkerResult | null {
        if (!this.webcamRunning || !this.poseLandmarker) return null;

        if (this.video.currentTime !== /*(not ==)*/ this.lastVideoTime) {
            this.lastVideoTime = this.video.currentTime;
            return this.poseLandmarker.detectForVideo(this.video, performance.now());
        }
        return null;
    }

    // Helper to draw the video frame to our preview canvas
    drawVideo(canvas: HTMLCanvasElement) {
        if (!this.webcamRunning) return;
        const ctx = canvas.getContext("2d");
        if (ctx) {
            canvas.width = this.video.videoWidth;
            canvas.height = this.video.videoHeight;
            ctx.drawImage(this.video, 0, 0, canvas.width, canvas.height);
        }
    }
}
