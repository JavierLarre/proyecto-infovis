// Función para leer y procesar CSV de forma asíncrona
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

  rows.forEach(row => {
      // Verificar separador ';' o ','
      const separator = row.includes(';') ? ';' : ',';
      const cols = row.split(separator);
      
      year.push(parseFloat(cols[0]));

      veloz_baja.push(((parseFloat(cols[1])*100)/parseFloat(cols[3]))*100);
      veloz_alta.push(((parseFloat(cols[2])*100)/parseFloat(cols[3]))*100);
      total_conx.push(parseFloat(cols[3]));
  });

  // Leo la data de Redes sociales
  const response_2 = await fetch('data/redes_sociales.csv');
  const datos_2 = await response_2.text();

  // Dividir los datos por líneas
  const rows_2 = datos_2.split('\n').slice(1);

  const ano = [];
  const users_mill = [];

  rows_2.forEach(row => {
      const separator = row.includes(';') ? ';' : ',';
      const cols = row.split(separator);
      
      ano.push(parseFloat(cols[0]));
      users_mill.push(parseFloat(cols[1]));
  });

  // Coloco la data de VELOCIDAD INTERNET en variables para plotly
  const trace_data_lenta = {
      x: year,
      y: veloz_baja,
      mode: 'lines+markers',
      name: 'Velocidad Baja'
  };

  const trace_data_rapida = {
      x: year,
      y: veloz_alta,
      mode: 'lines+markers',
      name: 'Velocidad Alta'
  };

  // COLOCO la data de REDES SOCIALES en variables para plotly
  const trace_redes_sociales = {
      x: ano,
      y: users_mill,
      mode: 'lines+markers',
      name: 'Usuarios en Redes Sociales (millones)'
  };

  // Configuración del layout
  var layout = {
      hovermode: false, // para activar o desactivar el overmouse
      showlegend: true,
      height: 600,
      width: 600,
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
        }
      },
      autosize: false,
      margin: {
          autoexpand: false,
          l: 100,
          r: 20,
          t: 100
      },
      annotations: [
          {
              xref: 'paper',
              yref: 'paper',
              x: 0.0,
              y: 1.05,
              xanchor: 'left',
              yanchor: 'bottom',
              text: 'Main Source for News',
              font:{
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
              text: 'Source: Pew Research Center & Storytelling with data',
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
  var data = [trace_data_lenta, trace_data_rapida, trace_redes_sociales];
  Plotly.newPlot('myDiv', data, layout, {displayModeBar: false}, {scrollZoom: false});
}

// Llamada a la función
procesarDatos();
