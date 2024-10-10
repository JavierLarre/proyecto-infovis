async function procesarDatos() {

    //leo datos de VELOCIDAD MOVIL y saco la data
    const response_3 = await fetch('data/velocidad_movil.csv');
    const datos_3 = await response_3.text();

    // Dividir los datos por líneas
    const rows_3 = datos_3.split('\n').slice(1);

    const year_3 = [];
    const velocidad_movil = [];
    const cant_smarphones = [];

    rows_3.forEach(rows => {
        const cols = rows.split(',');

        year_3.push(parseFloat(cols[0]));
        velocidad_movil.push((parseFloat(cols[1]) * 100) / parseFloat(cols[2]));
        cant_smarphones.push(cols[3]);
    });
    
    // Leo la data de Redes sociales y saco la data
    const response_2 = await fetch('data/redes_sociales.csv');
    const datos_2 = await response_2.text();

    // Dividir los datos por líneas
    const rows_2 = datos_2.split('\n').slice(1);

    const ano = [];
    const users_mill = [];

    rows_2.forEach(row => {
        const cols = row.split(','); 
        ano.push(parseFloat(cols[0]));
        users_mill.push((parseFloat(cols[1]) * 100) / (parseFloat(cols[3]) / 1000000));
    });


    // COLOCO la data de REDES SOCIALES en variable para plotly con caracteristicas
    const trace_redes_sociales = {
        x: ano,
        y: users_mill,
        mode: 'lines', // indica que tipo 
        name: 'Personas con <br>Redes Sociales', //título o nombre del dato
        line: { color: 'green', width: 2 } // le doy color a la linea y grosor
    };

    // COLOCO la data de INTERNET MOVIL en variable para plotly con caracteristicas
    const trace_total_internet_movil = {
        x: ano,
        y: cant_smarphones, // uso la variable de cantidad de smartphones
        mode: 'lines', // le pongo un modo
        name: 'Conexiones <br> Internet Movil', // le doy un nombre
        line: { color: 'gray', width: 2 } // le pongo un color y grosor
    };

    // Se agregan los datos a una variable que vamos a iterar para 
    // poder agregar al final de cada linea del gráfico el titulo o nombre
    // del dato

    const traces = [ trace_redes_sociales, trace_total_internet_movil];

    // creamos una variable anotaciones para agregar recuadros y 
    // cosas extras al gráfico
    const annotations = [

        // Creamos un cuadro con una notación
        {
            x: 2022, // Valor en el eje X donde se colocará la anotación
            y: 90, // Valor en el eje Y donde se colocará la anotación
            xref: 'x',
            yref: 'y',
            text: 'A pesar de que las conexiones por <br> internet Movil no influyen <br> en la cantidad de personas <br> con Redes Sociales y <br> hay mayor velocidad de internet <br> aún se ve un decreciemiento <br> importante aquí ', // Texto que aparecerá en el recuadro
            showarrow: true, // Muestra la flecha que apunta al punto
            arrowhead: 2, // Tipo de flecha
            ax: 40, // Desplazamiento horizontal de la anotación (en píxeles)
            ay: 150, // Desplazamiento vertical de la anotación (en píxeles)
            bordercolor: 'black', // Color del borde del recuadro
            borderwidth: 1,
            borderpad: 5,
            bgcolor: 'rgba(255, 255, 255, 0.9)', // Color de fondo del recuadro
            opacity: 0.8,
            font: {
                family: 'Arial',
                size: 12,
                color: 'black'
            }
        },

        // Agregamos un Título para el Gráfico
        {
            xref: 'paper',
            yref: 'paper',
            x: 0.0,
            y: 1.05,
            xanchor: 'left',
            yanchor: 'bottom',
            text: 'Conexiones a Internet vía smartphone <br> v/s Usuarios con Redes Sociales  en Chile',
            font: {
                family: 'Arial',
                size: 30,
                color: 'rgb(37,37,37)'
            },
            showarrow: false
        },

        // Agregamos un comentario con los lugares donde extraimos los datos
        // al final del gráfico
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
        },

        //Agregamos el texto de forma vertical de "Porcentaje" para el eje Y
        {
            xref: 'paper',
            yref: 'y',
            x: -0.05,
            y: 70,
            xanchor: 'center',
            yanchor: 'middle',
            text: 'Porcentaje',
            font: {
                family: 'Arial',
                size: 14,
                color: 'rgb(82, 82, 82)'
            },
            showarrow: false,
            textangle: -90 // Rotar el texto para que esté en vertical
        },

        // Anotación para indicar el inicio de 4G
        {
            x: 2014.3, // Ajusta el valor según el año en que comenzó el 4G
            y: 44, // Ajusta la posición vertical
            xref: 'x',
            yref: 'y',
            text: 'Inicio 4G',
            showarrow: false,
            arrowhead: 2,
            ax: 40,
            ay: -40,
            bordercolor: 'rgba(0, 0, 0, 0)',
            borderwidth: 1,
            borderpad: 4,
            bgcolor: 'rgba(0, 0, 0, 0)',
            font: {
                family: 'Arial',
                size: 12,
                color: 'gray'
            },
            textangle: -90 // Rotar el texto para que esté en vertical
        },

        // Anotación para indicar el inicio de 5G
        {
            x: 2021.3, // Ajusta el valor según el año en que comenzó el 5G
            y: 44, // Ajusta la posición vertical
            xref: 'x',
            yref: 'y',
            text: 'Inicio 5G',
            showarrow: false,
            arrowhead: 2,
            ax: 0,
            ay: -40,
            bordercolor: 'rgba(0, 0, 0, 0)',
            borderwidth: 1,
            borderpad: 4,
            bgcolor: 'rgba(0, 0, 0, 0)',
            font: {
                family: 'Arial',
                size: 12,
                color: 'blue'
            },
            textangle: -90 // Rotar el texto para que esté en vertical
        }
    ];

    //Por cada Trace que creamos, agregamoos al final el nombre y le damos estilo
    traces.forEach(trace => {
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

    // Configuración del layout
    var layout = {
        hovermode: false, // para que no muestre las etiquetas interactuables
        showlegend: false, // para que no muestre la leyenda

        // esto es el estilo de la leyenda
        legend: {
            x: 1.05,
            y: 1,
            bgcolor: 'rgba(255, 255, 255, 0.5)',
            bordercolor: 'rgba(0, 0, 0, 0)',
            borderwidth: 2
        },
        height: 700,
        width: 1000,
        //Damos caracteristicas relevantes al eje X, como estilo y funciones
        xaxis: { 
            showline: true, // muestra la linea encima de los años
            showgrid: false, // muestra la grilla del gráfico
            showticklabels: true,
            fixedrange: true, // para desactivar el ZOOM si es true
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
            },
            range: [2013, 2023] // damos un rango al eje X
        },
        yaxis: {
            showgrid: false, // muestra la grilla del gráfico
            zeroline: false,
            showline: true, // muestra la linea encima de los años
            fixedrange: true, // para desactivar el ZOOM si es true
            showticklabels: true,
            linecolor: 'rgb(204,204,204)',
            tickfont: {
                family: 'Arial',
                size: 12,
                color: 'rgb(82, 82, 82)'
            
            },
            range: [40, 100], // damos un rango al eje Y
        },
        autosize: false,
        margin: {
            l: 100,
            r: 150,
            t: 100,
            b: 100
        },

        // Para añadir lineas verticales 
        shapes: [
            // Línea vertical para el inicio de 4G
            {
                type: 'line',
                x0: 2014, // Ajusta el valor según el año en que comenzó el 4G
                x1: 2014,
                y0: 0,
                y1: 100,
                xref: 'x',
                yref: 'y',
                line: {
                    color: 'gray',
                    width: 2,
                    dash: 'dot'
                }
            },
            // Línea vertical para el inicio de 5G
            {
                type: 'line',
                x0: 2021, // Ajusta el valor según el año en que comenzó el 5G
                x1: 2021,
                y0: 0,
                y1: 100,
                xref: 'x',
                yref: 'y',
                line: {
                    color: 'blue',
                    width: 2,
                    dash: 'dot'
                }
            }
        ],
    
        annotations: annotations //Agreamos las anotaciones que hicimos
    }

    // Creamos vaiable para la data que va a recibir Plotly
    var data = [ trace_redes_sociales, trace_total_internet_movil];

    // añadimos los recursos a Plotly y desactivamos funciones para que quede estatico
    Plotly.newPlot('myDiv', data, layout, { displayModeBar: false }, { scrollZoom: false });

    // scrollZoom = para hacer ZOOM con la rueda del mause o los dedos
    // displayModeBar = barra con muchas opciones
}

// Llamada a la función
procesarDatos();
