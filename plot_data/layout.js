
// Configuración del layout
export const layout = {
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
        range: [2014, 2023] // damos un rango al eje X
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
        range: [0, 100], // damos un rango al eje Y
    },
    autosize: false,
    margin: {
        l: 100,
        r: 150,
        t: 100,
        b: 100
    },
    annotations: [] //Agreamos las anotaciones que hicimos
}
