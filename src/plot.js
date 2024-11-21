import { data } from './data.js';
import { layout } from './layout.js';
import { annotations } from './annotations.js';
import { SocialMedia } from './social_medias.js';
import { SVGHandler } from './svg_handler.js';
//import Protobject from './js/protobject.js'; // Importa el objeto Protobject para la comunicación



var social_medias = [];
var div = '';


async function get_social_medias() {
    social_medias = [
        new SocialMedia(
            'Facebook', 'sonidos/facebook.wav',
            'imagenes/facebook.png', 'scripts/uso_facebook.json', 2,
        ),
        new SocialMedia(
            'Instagram', 'sonidos/instagram.wav',
            'imagenes/instagram.png', 'scripts/uso_instagram.json', 3,
        ),
        new SocialMedia(
            'Twitter', 'sonidos/twitter.wav',
            'imagenes/twitter.png', 'scripts/uso_twitter.json', 4,
        ),
        // new SocialMedia('Youtube', 'sonidos/youtube.wav', 'imagenes/youtube.png', 'scripts/uso_youtube.json'),
    ]
    await Promise.all(social_medias.map(sm => sm.initialize()));
}

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
    layout.xaxis.range = [2014, 2023];
    Plotly.relayout(div, { images: layout.images });
    
    const traceIndex = eventData.points[0].curveNumber;
    if (traceIndex < 2) 
        return;
    const social_media = social_medias[traceIndex - 2];
    social_media.unHover();
    // Detener el sonido al dejar de estar sobre la línea
}

// // Escucha los datos recibidos desde Protobject
// Protobject.onReceived((order) => {
//     // Simula un "hover" o "unhover" basado en el contenido de `order`
//     if (order.action === 'hover') {
//         const traceIndex = order.traceIndex;
        
//         if (traceIndex >= 2 && traceIndex - 2 < social_medias.length) {
//             const social_media = social_medias[traceIndex - 2];
//             social_media.onHover(layout, order.x, order.y);
//         }
//     } else if (order.action === 'unhover') {
//         layout.images = [];
//         layout.xaxis.range = [2014, 2023];
//         Plotly.relayout(div, { images: layout.images });
        
//         const traceIndex = order.traceIndex;
//         if (traceIndex >= 2 && traceIndex - 2 < social_medias.length) {
//             const social_media = social_medias[traceIndex - 2];
//             social_media.unHover();
//         }
//     }

//     // Redibuja el gráfico con las trazas seleccionadas
//     Plotly.newPlot('myDiv', dataset, layout);
// });


export async function plotData() {
    
    const videoElement = document.getElementById("camera");

    // Verifica si getUserMedia es compatible y solicita acceso a la cámara
    if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
        console.log("Accediendo a la cámara...");
    }

    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: {
                width: 420,
                height: 420,
            },
        });
        videoElement.srcObject = stream; // Asigna el flujo al video
    } catch (error) {
        console.error("Error al acceder a la cámara:", error);
        alert("No se puede acceder a la cámara. Verifica los permisos.");
    }

    // plotply
    div = 'myDiv';
    layout.images = layout.images || [];
    
    await get_social_medias();
    const svgHandler = new SVGHandler(
        "svgContainer", "dibujos_svg/cuadro_texto_oscuro.svg"
    );
    await svgHandler.loadSVG();
    
    social_medias.forEach(sm => data.push(sm.trace));
    add_annotations_and_images_to_layout();
    Plotly.newPlot(div, data, layout, { displayModeBar: false, scrollZoom: true });

    document.getElementById(div).on('plotly_hover', hoverEvent);
    document.getElementById(div).on('plotly_unhover', unHoverEvent);
    
}