async function read_file(path) {
    const response = await fetch(path);
    return (await response.text()).split('\n').slice(1);
}

var rows = await read_file('data/redes_sociales.csv');
const ano = [];
const users_mill = [];

rows.forEach(row => {
    const cols = row.split(','); 
    ano.push(parseFloat(cols[0]));
    users_mill.push((parseFloat(cols[1]) * 100) / (parseFloat(cols[3]) / 1000000));
});

// COLOCO la data de REDES SOCIALES en variable
// para plotly con caracteristicas
export const trace_redes_sociales = {
    x: ano,
    y: users_mill,
    mode: 'lines', // indica que tipo 
    name: 'Personas con <br>Redes Sociales', //título o nombre del dato
    line: { color: 'green', width: 2 } // le doy color a la linea y grosor
};


rows = await read_file('data/velocidad_movil.csv');
const velocidad_movil = [];
const cant_smarphones = [];

rows.forEach(rows => {
    const cols = rows.split(',');

    // year_3.push(parseFloat(cols[0]));
    velocidad_movil.push((parseFloat(cols[1]) * 100) / parseFloat(cols[2]));
    cant_smarphones.push(cols[3]);
});


// COLOCO la data de INTERNET MOVIL en variable
// para plotly con caracteristicas
export const trace_total_internet_movil = {
    x: ano,
    y: cant_smarphones, // uso la variable de cantidad de smartphones
    mode: 'lines', // le pongo un modo
    name: 'Conexiones <br> Internet Movil', // le doy un nombre
    line: { color: 'gray', width: 2 } // le pongo un color y grosor
};

// Se agregan los datos a una variable que vamos a iterar para 
// poder agregar al final de cada linea del gráfico el titulo o nombre
// del dato
export const traces = [trace_redes_sociales, trace_total_internet_movil];
//Por cada Trace que creamos, agregamoos al final el nombre y le damos estilo
// traces.forEach(trace => {
//     annotations.push({
//         x: trace.x[trace.x.length - 1], // Último valor en el eje X
//         y: trace.y[trace.y.length - 1], // Último valor en el eje Y
//         xanchor: 'left',
//         yanchor: 'middle',
//         text: trace.name,
//         font: {
//             family: 'Trebuchet MS',
//             size: 15,
//             color: trace.line?.color || 'black' // Usa el color de la línea si está definido
//         },
//         showarrow: false
//     });
// });


// Creamos vaiable para la data que va a recibir Plotly
export const data = [trace_redes_sociales, trace_total_internet_movil];
