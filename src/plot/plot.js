import { data } from './traces.js';
import { layout } from './layout.js';
import { annotations } from './annotations.js';
import { social_medias } from '../social_media/social_medias.js';
import { loadSVG } from '../svg/svg_handler.js';


var div = 'myDiv';


function add_annotations_and_images_to_layout() {
    data.forEach(trace => {
        annotations.push({
            x: trace.x[trace.x.length - 1] ,
            y: trace.y[trace.y.length - 1],
            xanchor: 'left',
            yanchor: 'middle',
            text: trace.name,
            font: {
                family: 'Trebuchet MS',
                size: 14,
                color: trace.line?.color || 'black'
            },
            showarrow: false
        });
        if (trace.name === `Usuarios de <br> <b>Instagram<b>`){
            const ann = annotations[annotations.length - 1] 
            ann.y = ann.y - 2;
        }
        if (trace.name === `Usuarios de <br> <b>Facebook<b>`){
            const ann = annotations[annotations.length - 1] 
            ann.y = ann.y + 2;
        }
    });
    layout.annotations = annotations;
}


function hoverEvent(eventData) {
    const point = eventData.points[0];
    const traceIndex = point.curveNumber;
    if (traceIndex < 2) 
        return;
    const social_media = social_medias[traceIndex - 2];
    social_media.onHover(layout, point.x, point.y);
}


function unHoverEvent(eventData) {
    layout.images = [];
    Plotly.relayout(div, { images: layout.images });
    const traceIndex = eventData.points[0].curveNumber;
    
    if (traceIndex < 2) 
        return;
    const social_media = social_medias[traceIndex - 2];
    social_media.unHover();
    // Detener el sonido al dejar de estar sobre la línea
}


export async function plotData() {
    
    layout.images = layout.images || [];
    await loadSVG();
    
    social_medias.forEach(sm => data.push(sm.trace));
    add_annotations_and_images_to_layout();
    Plotly.newPlot(div, data, layout, { displayModeBar: false, scrollZoom: true });

    document.getElementById(div).on('plotly_hover', hoverEvent);
    document.getElementById(div).on('plotly_unhover', unHoverEvent);
    
}