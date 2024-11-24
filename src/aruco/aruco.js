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
        const imageData = this.snapshot();

        // Validar si se obtuvo imagen
        if (!imageData) {
            console.warn("No image data available for marker detection.");
            return [];
        }

        // Detectar los marcadores en la imagen
        const detectedMarkers = this.detector.detect(imageData);
        if (!Array.isArray(detectedMarkers) || detectedMarkers.length === 0) {
            return []; // Si no se detectan marcadores, devuelve una lista vacía.
        }

        // Procesar los marcadores para devolverlos en el formato deseado
        const markers = detectedMarkers.map(marker => {
            if (marker.id !== undefined && marker.corners) {
                // Calcular la posición promedio en los ejes X e Y
                const avgX = marker.corners.reduce((sum, corner) => sum + corner.x, 0) / marker.corners.length;
                const avgY = marker.corners.reduce((sum, corner) => sum + corner.y, 0) / marker.corners.length;
                return [marker.id, avgX, avgY];
            } else {
                console.warn("Invalid marker detected: ", marker);
                return null; // Ignorar marcadores inválidos.
            }
        }).filter(marker => marker !== null); // Filtrar nulos en caso de marcadores inválidos.

        this.markers = markers;
        return this.markers;
    }
}

export const aruco = new Aruco();