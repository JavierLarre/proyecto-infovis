// plot.js
import { data } from './data.js';
import { layout } from './layout.js';
import { annotations } from './annotations.js';

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

    // Evento de hover para mostrar la imagen
    document.getElementById('myDiv').on('plotly_hover', function(eventData) {
        const point = eventData.points[0];
        const xValue = point.x;
        const yValue = point.y;

        // Declarar hoverImage y asignar propiedades de imagen
        let hoverImage = {
            source: "imagenes/Los-gatos-tienen-casi-300-expresiones-faciales.jpg",
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
    });

    // Evento de unhover para ocultar la imagen
    document.getElementById('myDiv').on('plotly_unhover', function() {
        // Limpiar las imágenes en el layout y actualizar
        layout.images = [];
        Plotly.relayout('myDiv', { images: layout.images });
    });
}
