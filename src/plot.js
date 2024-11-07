import { data } from './data.js';
import { layout } from './layout.js';
import { annotations } from './annotations.js';
import { SocialMedia } from './social_medias.js';


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

export async function plotData() {
    layout.images = layout.images || [];
    add_annotations_and_images_to_layout();

    const div = 'myDiv';
    const social_medias = [
        new SocialMedia('Facebook', 'sonidos/facebook.wav', 'imagenes/facebook.png', 'scripts/uso_facebook.json'),
        new SocialMedia('Instagram', 'sonidos/instagram.wav', 'imagenes/instagram.png', 'scripts/uso_instagram.json'),
        // new SocialMedia('Twitter', 'sonidos/twitter.wav', 'iconos/twitter.png', 'scripts/uso_twitter.json'),
        // new SocialMedia('Youtube', 'sonidos/youtube.wav', 'iconos/youtube.png', 'scripts/uso_youtube.json'),
        // new SocialMedia('Google', 'sonidos/google.wav', 'iconos/google.png', 'scripts/uso_google.json')
    ]

    await Promise.all(social_medias.map(sm => sm.initialize()));
    
    data.push(social_medias[0].trace);
    data.push(social_medias[1].trace);
    Plotly.newPlot(div, data, layout, { displayModeBar: false, scrollZoom: true });

    document.getElementById(div).on('plotly_hover', function(eventData) {
        const point = eventData.points[0];
        const traceIndex = point.curveNumber;
        if (traceIndex < 2) 
            return;
        const social_media = social_medias[traceIndex - 2];
        social_media.playSound();
        social_media.placeImage(layout, point.x, point.y);
    });

    document.getElementById(div).on('plotly_unhover', function(eventData) {
        // Limpiar las imágenes en el layout sin eliminar otras configuraciones
        layout.images = [];
        Plotly.relayout(div, { images: layout.images });
        
        const traceIndex = eventData.points[0].curveNumber;
        if (traceIndex < 2) 
            return;
        social_medias[traceIndex - 2].stopSound();
        // Detener el sonido al dejar de estar sobre la línea
    });
}