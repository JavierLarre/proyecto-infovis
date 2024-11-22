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
        this.video.addEventListener('play', () => {
            this.canvas.width = this.video.videoWidth;
            this.canvas.height = this.video.videoHeight;
            const video = this.video;
            const canvas = this.canvas;
            const context = this.context;
            this.markers = [];
            const markers = this.markers;
    
            function processFrame() {
                if (video.paused || video.ended) {
                    return;
                }
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    
                new AR.Detector().detect(imageData).forEach(marker => {
                    markers[0] = marker;
                });
                requestAnimationFrame(processFrame);
            }
            processFrame();
        });
    }
    
    setupElements() {
        this.video = document.getElementById('video');
        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext('2d');
    }

    snapshot() {
        if (this.video.paused || this.video.ended) {
            return [];
        }
        const width = this.canvas.width;
        const height = this.canvas.height
        this.context.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
        const imageData = this.context.getImageData(0, 0, width, height);
        console.log(imageData);
        return imageData;
    }

    getMarkers() {
        return this.markers;
    }
}

export const aruco = new Aruco();