import { data } from './traces.js';
import { layout } from './layout.js';
import { annotations } from './annotations.js';
import { social_medias } from '../social_media/social_medias.js';
import { loadSVG } from '../svg/svg_handler.js';
// import { aruco } from "../aruco/aruco.js";

var div = 'myDiv';
let activeArucoMarkers = new Set(); // Conjunto para rastrear los marcadores Aruco activos

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
                size: 14,
                color: trace.line?.color || 'black'
            },
            showarrow: false
        });
        if (trace.name === `Usuarios de <br> <b>Instagram<b>`) {
            const ann = annotations[annotations.length - 1];
            ann.y = ann.y - 2;
        }
        if (trace.name === `Usuarios de <br> <b>Facebook<b>`) {
            const ann = annotations[annotations.length - 1];
            ann.y = ann.y + 2;
        }
    });
    layout.annotations = annotations;
}

function hoverEvent(eventData) {
    if (activeArucoMarkers.size > 0) return; // Deshabilitar hover del mouse si hay marcadores activos

    const point = eventData.points[0];
    const traceIndex = point.curveNumber;
    if (traceIndex < 2) 
        return;
    const social_media = social_medias[traceIndex - 2];
    social_media.onHover(layout, point.x, point.y);
}

function unHoverEvent(eventData) {
    if (activeArucoMarkers.size > 0) return; // Deshabilitar unhover del mouse si hay marcadores activos

    layout.images = [];
    Plotly.relayout(div, { images: layout.images });
    const traceIndex = eventData.points[0].curveNumber;

    if (traceIndex < 2) 
        return;
    const social_media = social_medias[traceIndex - 2];
    social_media.unHover();
}

function arucoEvent(marker) {
    const [id, x, y] = marker;

    // Map IDs to social media
    const idToSocialMedia = {
        1: 'Facebook',
        2: 'Instagram',
        3: 'Twitter'
    };

    const socialMediaName = idToSocialMedia[id];
    if (!socialMediaName) return;

    activeArucoMarkers.add(id); // Marcar este ID como activo

    const social_media = social_medias.find(sm => sm.name === socialMediaName);
    if (social_media) {
        social_media.onHover(layout, x, y);
        Plotly.relayout(div, { images: layout.images });
    }
}

function clearArucoMarkers() {
    if (activeArucoMarkers.size === 0) return;

    activeArucoMarkers.clear(); // Limpiar todos los marcadores activos
    layout.images = [];
    Plotly.relayout(div, { images: layout.images });

    // Asegurar que todos los elementos unHover sean activados
    social_medias.forEach(sm => sm.unHover());
}

function listenForArucoMarkers() {
    let previousMarkers = [];

    setInterval(() => {
        const markers = aruco.getMarkers();

        if (!Array.isArray(markers) || markers.length === 0) {
            // Si no hay marcadores, limpiar estado
            clearArucoMarkers();
            return;
        }

        // Procesar solo si hay cambios en los marcadores
        if (JSON.stringify(markers) !== JSON.stringify(previousMarkers)) {
            previousMarkers = markers;

            // Activar hover para cada marcador detectado
            markers.forEach(marker => {
                arucoEvent(marker);
            });
        }
    }, 100); // Verificar cada 100ms
}

export async function plotData() {
    layout.images = layout.images || [];
    await loadSVG();

    social_medias.forEach(sm => data.push(sm.trace));
    add_annotations_and_images_to_layout();
    Plotly.newPlot(div, data, layout, { displayModeBar: false, scrollZoom: true });

    document.getElementById(div).on('plotly_hover', hoverEvent);
    document.getElementById(div).on('plotly_unhover', unHoverEvent);

    // Iniciar escucha de marcadores Aruco
    listenForArucoMarkers();
}
