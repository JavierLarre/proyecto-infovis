import { plotData } from "./src/plot/plot.js";
import { AR } from "./src/aruco/aruco.js";

await plotData();

const detector = new AR.Detector();
// Function to process the video frame and detect markers
function detectMarkers(imageData) {
    const markers = detector.detect(imageData);
    if (markers.length > 0) {
        const marker = markers[0];
        const div = document.getElementById('aruco-detected');
        div.innerHTML = `ID: ${marker.id} AT: ${marker.corners[0].x}, ${marker.corners[0].y}`;
    }
}

function init() {
    const video = document.getElementById('video') ;
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    // Capture the video frame and detect markers
    video.addEventListener('play', () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        function processFrame() {
            if (video.paused || video.ended) {
                return;
            }
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

            detectMarkers(imageData);
            requestAnimationFrame(processFrame);
        }
        processFrame();
    });

    // Access the webcam
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            video.srcObject = stream;
        })
        .catch(err => {
            console.error(err.name + ": " + err.message);
        });
}

init();