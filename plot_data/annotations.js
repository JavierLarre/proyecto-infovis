// creamos una variable anotaciones para agregar recuadros y 
// cosas extras al gráfico
export const annotations = [

    // Creamos un cuadro con una notación
    {
        x: 2022, // Valor en el eje X donde se colocará la anotación
        y: 90, // Valor en el eje Y donde se colocará la anotación
        xref: 'x',
        yref: 'y',
        text: 'Quiebre nivel de usuarios', // Texto que aparecerá en el recuadro
        showarrow: true, // Muestra la flecha que apunta al punto
        arrowhead: 2, // Tipo de flecha
        ax: 50, // Desplazamiento horizontal de la anotación (en píxeles)
        ay: 65, // Desplazamiento vertical de la anotación (en píxeles)
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
        x: -0.1,
        y: 58,
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
];