export class UI {
    container: HTMLElement;
    captureBtn: HTMLButtonElement;
    copyBtn: HTMLButtonElement;
    countdownEl: HTMLElement;

    onCaptureStart: () => void = () => { };
    onCaptureComplete: () => void = () => { };
    onCopy: () => void = () => { };

    constructor() {
        this.container = document.getElementById('ui-container')!;

        // 1. Create "Capture Pose" Button
        this.captureBtn = document.createElement('button');
        this.captureBtn.innerText = "📸 Capture Pose";
        this.captureBtn.className = "ui-btn"; // We'll style this next
        this.captureBtn.onclick = () => this.startCountdown();

        // 2. Create "Copy PNG" Button (Hidden at first)
        this.copyBtn = document.createElement('button');
        this.copyBtn.innerText = "📋 Copy PNG";
        this.copyBtn.className = "ui-btn";
        this.copyBtn.style.display = "none"; // Hide until we capture
        this.copyBtn.onclick = () => this.onCopy();

        // 3. Create Countdown Overlay
        this.countdownEl = document.createElement('div');
        this.countdownEl.id = "countdown";
        this.countdownEl.style.display = "none";
        document.body.appendChild(this.countdownEl);

        this.container.appendChild(this.captureBtn);
        this.container.appendChild(this.copyBtn);
    }

    startCountdown() {
        this.captureBtn.disabled = true;
        this.copyBtn.style.display = "none";
        this.countdownEl.style.display = "flex";

        let count = 3;
        this.countdownEl.innerText = count.toString();

        const timer = setInterval(() => {
            count--;
            if (count > 0) {
                this.countdownEl.innerText = count.toString();
            } else {
                clearInterval(timer);
                this.countdownEl.style.display = "none";
                this.captureBtn.disabled = false;
                this.captureBtn.innerText = "🔄 Retake";
                this.copyBtn.style.display = "inline-block";

                // Trigger the actual capture in main.ts
                this.onCaptureComplete();
            }
        }, 1000);
    }
}