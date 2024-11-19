import Protobject from './js/protobject.js';
import Aruco from './js/aruco.js';

// Inicializa el sistema de detección de marcadores Aruco
Aruco.start(30, 1); // La cámara genera eventos cada 30 ms y utiliza la cámara con id 1
Aruco.showPreview({ top: 0, left: 0, width: 1280 / 3, height: 720 / 3 }); // Muestra la vista previa de la cámara

// Escucha los datos de los marcadores Aruco
Aruco.onData((data) => {
    //console.log(data); // Muestra los datos en la consola para depuración
  
    // Identificadores de marcadores que se desea verificar
    // 1 Facebook - 2 Instragam - 3 Twitter
    const markerIds = [1, 2, 3]; 

    let markers = []; // Array para almacenar los marcadores detectados
  
    // Recorre los identificadores de marcadores y verifica su presencia en los datos
    for (const id of markerIds) {
      if (data[id]) {
        // Si el marcador está presente, guarda su id y posición en el eje Y
        markers.push({ id: id, x: data[id].position.x });
      }
    }
  // Envía los IDs ordenados al sistema principal
  Protobject.send(markers).to('plot.js');
});