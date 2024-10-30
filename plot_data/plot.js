import { data } from './data.js';
import { layout } from './layout.js';
import { annotations } from './annotations.js';

// Ruta del archivo de sonido personalizado
const audioFilePath = "sonidos/sonido_prueba.mp3"; // Cambia esta ruta a la de tu archivo de sonido

// Crear un reproductor de audio con Tone.js
let audioPlayer;
Tone.loaded().then(() => {
    audioPlayer = new Tone.Player(audioFilePath).toDestination();
    audioPlayer.autostart = false;
    audioPlayer.loop = false;
});

function add_annotations_and_images_to_layout() {
    data.forEach(trace => {
        annotations.push({
            x: trace.x[trace.x.length - 1],
            y: trace.y[trace.y.length - 1],
            xanchor: 'left',
            yanchor: 'middle',
            text: trace.name,
            font: {
                family: 'Trebuchet MS',
                size: 15,
                color: trace.line?.color || 'black'
            },
            showarrow: false
        });
    });
    layout.annotations = annotations;
}

const imageUrls = [
    // Imágenes para el primer trace (trace 0)
    ["imagenes/twitterX.png",
        "imagenes/Instagram_logo_2022.svg.png",
        "imagenes/google-plus-logo.png",
        "imagenes/google-plus-logo.png",
        "imagenes/Instagram_logo_2022.svg.png",
        "imagenes/twitterX.png",
        "imagenes/google-plus-logo.png",
        "imagenes/Instagram_logo_2022.svg.png",
        "imagenes/google-plus-logo.png",
        "imagenes/google-plus-logo.png"
    ],
    
    // Imágenes para el segundo trace (trace 1)
    ["imagenes/twitterX.png",
        "imagenes/Instagram_logo_2022.svg.png",
        "imagenes/google-plus-logo.png",
        "imagenes/twitterX.png",
        "imagenes/google-plus-logo.png",
        "imagenes/google-plus-logo.png",
        "imagenes/Los-gatos-tienen-casi-300-expresiones-faciales.jpg",
        "imagenes/google-plus-logo.png",
        "imagenes/twitterX.png",
        "imagenes/twitterX.png"
    ],
];

export function plotData() {
    layout.images = layout.images || [];
    add_annotations_and_images_to_layout();

    const div = 'myDiv';
    Plotly.newPlot(div, data, layout, { displayModeBar: false, scrollZoom: true });

    document.getElementById(div).on('plotly_hover', function(eventData) {
        const point = eventData.points[0];
        const traceIndex = point.curveNumber;
        const pointIndex = point.pointIndex;
        const xValue = point.x;
        const yValue = point.y;

        // Configuración de la imagen de hover
        let hoverImage = {
            source: imageUrls[traceIndex][pointIndex],
            x: xValue,
            y: yValue - 8,
            sizex: 10,
            sizey: 10,
            xanchor: "center",
            yanchor: "middle",
            xref: "x",
            yref: "y"
        };

        // Actualizamos layout.images sin eliminar otras imágenes
        layout.images = [hoverImage];
        Plotly.relayout(div, { images: layout.images });

        // Asegurarse de que el contexto de audio esté activado y reproducir el sonido
        if (Tone.context.state !== 'running') {
            Tone.context.resume().then(() => {
                playSound(yValue);
            });
        } else {
            playSound(yValue);
        }
    });

    document.getElementById(div).on('plotly_unhover', function() {
        // Limpiar las imágenes en el layout sin eliminar otras configuraciones
        layout.images = [];
        Plotly.relayout(div, { images: layout.images });

        // Detener el sonido al dejar de estar sobre la línea
        if (audioPlayer && audioPlayer.state === "started") {
            audioPlayer.stop();
        }
    });
}

function playSound(yValue) {
    if (audioPlayer) {
        audioPlayer.playbackRate = Math.min(2, Math.max(0.5, yValue / 500));
        audioPlayer.start();
    }
}
