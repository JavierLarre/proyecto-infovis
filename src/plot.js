import { data } from './data.js';
import { layout } from './layout.js';
import { annotations } from './annotations.js';
import { PlayOnHover, stopSound } from './audio.js'; 
import { place_image } from './images.js';
import { loadData } from './data_loader.js';
import { addButtons } from './buttons.js';
import { trace_facebook } from './trace_facebook.js';
import { trace_instagram } from './trace_instagram.js';

const yearFunFact = await loadData();
console.log(yearFunFact);

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

function changeTrace(button) {
    var trace;
    if (button === 'facebook') {
        trace = trace_facebook;
    }
    if (button === 'instagram') {
        trace = trace_instagram;
    }
    const plot = document.getElementById('myDiv');
    plot.data[0] = trace;
    Plotly.redraw(plot);
}

function connectButtons(buttons) {
    for (const button in buttons) {
        buttons[button].onclick = function() {
            changeTrace(button);
        }
    }
}

export function plotData() {
    layout.images = layout.images || [];
    add_annotations_and_images_to_layout();

    const div = 'myDiv';
    Plotly.newPlot(div, data, layout, { displayModeBar: false, scrollZoom: true });
    connectButtons(addButtons(div));

    document.getElementById(div).on('plotly_hover', function(eventData) {
        const point = eventData.points[0];
        // const traceIndex = point.curveNumber;
        // const pointIndex = point.pointIndex;
        const xValue = point.x;
        const yValue = point.y;
        console.log(yearFunFact[xValue]);

        place_image(xValue, yValue, layout);
        // Asegurarse de que el contexto de audio esté activado y reproducir el sonido
        PlayOnHover(xValue, yValue);
    });

    document.getElementById(div).on('plotly_unhover', function() {
        // Limpiar las imágenes en el layout sin eliminar otras configuraciones
        layout.images = [];
        Plotly.relayout(div, { images: layout.images });

        // Detener el sonido al dejar de estar sobre la línea
        stopSound();
    });
}