import { AR } from "./lib/aruco.js";

class Aruco {
    constructor() {
        this.detector = new AR.Detector();
        this.markers = [];
        this.setupElements();
    }

    start() {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                this.video.srcObject = stream;
            })
            .catch(err => {
                console.error(err.name + ": " + err.message);
            });
    }
    
    setupElements() {
        this.video = document.getElementById('video');
        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext('2d');

        this.video.addEventListener('play', () => {
            this.canvas.width = this.video.videoWidth;
            this.canvas.height = this.video.videoHeight;
        });
    }

    snapshot() {
        if (this.video.paused || this.video.ended) {
            return [];
        }
        const width = this.canvas.width;
        const height = this.canvas.height;
        this.context.drawImage(this.video, 0, 0, width, height);
        const imageData = this.context.getImageData(0, 0, width, width);
        return imageData;
    }

    getMarkers() {
        const markers = this.detector.detect(this.snapshot());
        this.markers = markers;
        return this.markers;
    }
}

export const aruco = new Aruco();