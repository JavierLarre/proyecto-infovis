import { data } from './data.js';
import { layout } from './layout.js';
import { annotations } from './annotations.js';
import * as Tone from 'tone'; // Importar Tone.js

// Inicializar un sintetizador
const synth = new Tone.Synth().toDestination();
synth.volume.value = -10; // Ajustar volumen inicial

function add_annotations_and_images_to_layout() {
    data.forEach(trace => {
        // Agregar anotación para el nombre de la línea
        annotations.push({
            x: trace.x[trace.x.length - 1], // Último valor en el eje X
            y: trace.y[trace.y.length - 1], // Último valor en el eje Y
            xanchor: 'left',
            yanchor: 'middle',
            text: trace.name,
            font: {
                family: 'Trebuchet MS',
                size: 15,
                color: trace.line?.color || 'black' // Usa el color de la línea si está definido
            },
            showarrow: false
        });
    });

    // Actualizar el layout con las anotaciones
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
    // Inicializar layout.images como array vacío si no está definido
    layout.images = layout.images || [];

    // Llamar a la función para agregar anotaciones
    add_annotations_and_images_to_layout();

    // Renderizar el gráfico
    const div = 'myDiv';
    Plotly.newPlot(
        div,
        data,
        layout,
        { displayModeBar: false, scrollZoom: true }
    );

    // Evento de hover para mostrar la imagen correspondiente al trace y punto
    document.getElementById('myDiv').on('plotly_hover', function(eventData) {
        const point = eventData.points[0];
        const traceIndex = point.curveNumber;  // Índice del trace
        const pointIndex = point.pointIndex;   // Índice del punto dentro del trace
        const xValue = point.x;
        const yValue = point.y;

        // Usar la URL de imagen correspondiente al trace y punto actual
        let hoverImage = {
            source: imageUrls[traceIndex][pointIndex],  // Selecciona la imagen según el trace y el punto
            x: xValue,
            y: yValue - 8,
            sizex: 10,
            sizey: 10,
            xanchor: "center",
            yanchor: "middle",
            xref: "x",
            yref: "y"
        };

        // Agregar la imagen al layout y actualizar el gráfico
        layout.images = [hoverImage];
        Plotly.relayout('myDiv', { images: layout.images });

        // Reproducir el sonido con una frecuencia ajustada
        const frequency = 440 + (traceIndex * 100); // Ajustar la frecuencia según el trace
        synth.triggerAttack(Tone.Frequency(frequency), Tone.now());
    });

    // Evento de unhover para ocultar la imagen y detener el sonido
    document.getElementById('myDiv').on('plotly_unhover', function() {
        // Limpiar las imágenes en el layout y actualizar
        layout.images = [];
        Plotly.relayout('myDiv', { images: layout.images });

        // Detener el sonido al dejar de estar sobre la línea
        synth.triggerRelease(Tone.now());
    });
}
