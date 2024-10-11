// plot.js
import { data } from './data.js';
import { layout } from './layout.js';
import { annotations } from './annotations.js';

function add_annotations_to_layout() {
    data.forEach(trace => {
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
layout.annotations = annotations;
}

export function plotData() {

    add_annotations_to_layout();

    // añadimos los recursos a Plotly y desactivamos funciones para que quede estatico
    const div = 'myDiv';
    Plotly.newPlot(
        div,
        data,
        layout,
        { displayModeBar: false },
        { scrollZoom: false }
    );

    // scrollZoom = para hacer ZOOM con la rueda del mause o los dedos
    // displayModeBar = barra con muchas opciones
}