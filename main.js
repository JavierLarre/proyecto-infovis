async function procesarDatos() {
    // Leo archivo de velocidad internet y saco la data
    const response = await fetch('data/velocidad_internet.csv');
    const datos = await response.text();

    // Dividir los datos por líneas
    const rows = datos.split('\n').slice(1);

    const year = [];
    const veloz_baja = [];
    const veloz_alta = [];
    const total_conx = [];
    const total_pobl = [];

    rows.forEach(row => {
        const cols = row.split(',');
        year.push(parseFloat(cols[0]));

        veloz_baja.push(((parseFloat(cols[1]) * 100) / parseFloat(cols[3])));
        veloz_alta.push(((parseFloat(cols[2]) * 100) / parseFloat(cols[3])));
        total_conx.push((parseFloat(cols[3]) * 100) / (parseFloat(cols[4])));
        total_pobl.push(parseFloat(cols[4]));
    });

    //leo datos de VELOCIDAD MOVIL

    const response_3 = await fetch('data/velocidad_movil.csv');
    const datos_3 = await response_3.text();

    // Dividir los datos por líneas
    const rows_3 = datos_3.split('\n').slice(1);

    const year_3 = [];
    const velocidad_movil = [];

    rows_3.forEach(rows => {
        const cols = rows.split(',');
        year_3.push(parseFloat(cols[0]));
        velocidad_movil.push((parseFloat(cols[1]) * 100) / parseFloat(cols[2]))
        console.log((parseFloat(cols[1]) * 100) / parseFloat(cols[2]));
    });
    


    // Leo la data de Redes sociales
    const response_2 = await fetch('data/redes_sociales.csv');
    const datos_2 = await response_2.text();

    // Dividir los datos por líneas
    const rows_2 = datos_2.split('\n').slice(1);

    const ano = [];
    const users_mill = [];

    rows_2.forEach(row => {
        const cols = row.split(','); // Usar ',' directamente para dividir las columnas
        ano.push(parseFloat(cols[0]));
        users_mill.push((parseFloat(cols[1]) * 100) / (parseFloat(cols[3]) / 1000000));
    });

    // Coloco la data de VELOCIDAD INTERNET en variables para plotly
    const trace_data_lenta = {
        x: year,
        y: veloz_baja,
        mode: 'lines+markers',
        name: 'Internet entre 10 y 100 Mbps'
    };

    const trace_data_rapida = {
        x: year,
        y: veloz_alta,
        mode: 'lines+markers',
        name: 'Internet entre 100 Mbps y 1Gbps'
    };

    // COLOCO la data de REDES SOCIALES en variables para plotly
    const trace_redes_sociales = {
        x: ano,
        y: users_mill,
        mode: 'lines+markers',
        name: 'Porcentaje Usuarios en Redes Sociales'
    };

    // COLOCO la data de TOTAL CONEXIONES FIJAS en variables para plotly
    const trace_total_internet = {
        x: year,
        y: total_conx,
        mode: 'lines+markers',
        name: 'Porcentaje Usuarios con internet fijo'
    };

    const trace_total_internet_movil = {
        x: year,
        y: velocidad_movil,
        mode: 'lines+markers',
        name: 'Porcentaje Usuarios con internet movil'
    };

    // Configuración del layout
    var layout = {
        hovermode: false, 
        showlegend: true,
        legend: {
            x: 1.05,
            y: 1,
            bgcolor: 'rgba(255, 255, 255, 0.5)',
            bordercolor: 'rgba(0, 0, 0, 0)',
            borderwidth: 2
        },
        height: 700,
        width: 1000,
        xaxis: {
            showline: true,
            showgrid: false,
            showticklabels: true,
            fixedrange: true,
            linecolor: 'rgb(204,204,204)',
            linewidth: 2,
            autotick: false,
            ticks: 'outside',
            tickcolor: 'rgb(204,204,204)',
            tickwidth: 2,
            ticklen: 5,
            tickfont: {
                family: 'Arial',
                size: 12,
                color: 'rgb(82, 82, 82)'
            }
        },
        yaxis: {
            showgrid: false,
            zeroline: false,
            showline: true,
            fixedrange: true,
            showticklabels: true,
            linecolor: 'rgb(204,204,204)',
            tickfont: {
                family: 'Arial',
                size: 12,
                color: 'rgb(82, 82, 82)'
            },
        },
        autosize: false,
        margin: {
            l: 100,
            r: 150,
            t: 100,
            b: 100
        },
        annotations: [
            {
                xref: 'paper',
                yref: 'paper',
                x: 0.0,
                y: 1.05,
                xanchor: 'left',
                yanchor: 'bottom',
                text: 'Relación Velocidad Internet y Usuarios con RRSS',
                font: {
                    family: 'Arial',
                    size: 30,
                    color: 'rgb(37,37,37)'
                },
                showarrow: false
            },
            {
                xref: 'paper',
                yref: 'paper',
                x: 0.5,
                y: -0.1,
                xanchor: 'center',
                yanchor: 'top',
                text: 'Datos: Statista & Subtel',
                showarrow: false,
                font: {
                    family: 'Arial',
                    size: 12,
                    color: 'rgb(150,150,150)'
                }
            }
        ]
    };

    // Se agregan los datos a Plotly
    var data = [ trace_redes_sociales, trace_total_internet, trace_total_internet_movil];
    Plotly.newPlot('myDiv', data, layout, { displayModeBar: false }, { scrollZoom: false });
}

// Llamada a la función
procesarDatos();
