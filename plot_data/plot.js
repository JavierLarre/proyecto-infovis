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
            label: 'User Probar',
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

    
    // Agregar un evento de hover al gráfico
    var divImage = document.getElementById("tooltipImageDiv"); // Un div en HTML que actúa como tooltip
    var imgElement = document.createElement("img");
    imgElement.src = "imagenes/Los-gatos-tienen-casi-300-expresiones-faciales.jpg";
    imgElement.style.width = "50px";
    imgElement.style.height = "50px";
    divImage.appendChild(imgElement);
    add_annotations_to_layout();

    // añadimos los recursos a Plotly y desactivamos funciones para que quede estatico
    const div = 'myDiv';
    Plotly.newPlot(
        div,
        data,
        layout,
        { displayModeBar: false },
        { scrollZoom: true }
    );

    // scrollZoom = para hacer ZOOM con la rueda del mause o los dedos
    // displayModeBar = barra con muchas opciones

    document.getElementById('myDiv').on('plotly_hover', function(eventData) {
        // Posicionar y mostrar el div
        divImage.style.left = eventData.event.x + 'px';
        divImage.style.top = eventData.event.y + 'px';
        divImage.style.display = 'block';
    });

    document.getElementById('myDiv').on('plotly_unhover', function() {
        // Ocultar el div cuando no esté en hover
        divImage.style.display = 'none';
    });
}