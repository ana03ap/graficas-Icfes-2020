// let query = 'select Estrato, avg(punt_global) promedioPuntajeGlobal from dbo.datos group by Estrato  order by promedioPuntajeGlobal';

// // Agrega el parámetro 'query' a la URL como una cadena de consulta
// let url = `http://localhost:3001/api/data?query=${encodeURIComponent(query)}`;
// console.log('hola')
// fetch(url)
//   .then(response => response.json())
//   .then(data => {

//     console.log(data);

  
//     console.log("hola desde cliente")
//     // cuando la peticion a la api está funcionando
//     const svgWidth = 800;
//     const svgHeight = 500;
//     const margin = { top: 40, right: 30, bottom: 60, left: 60 };
//     const width = svgWidth - margin.left - margin.right;
//     const height = svgHeight - margin.top - margin.bottom;

//     const svg = d3.select('#chart')
//       .append('svg')
//       .attr('width', svgWidth)
//       .attr('height', svgHeight)
//       .append('g')
//       .attr('transform', `translate(${margin.left},${margin.top})`);


//       console.log(data.map(d => d.Estrato))
//     const xScale = d3.scaleBand()
//       .domain(data.map(d => d.Estrato))
//       .range([0, width])
//       .padding(0.1);

//     const yScale = d3.scaleLinear()
//       .domain([0, d3.max(data, d => d.promedioPuntajeGlobal)])
//       .nice()
//       .range([height, 0]);

//     svg.selectAll('.bar')
//       .data(data)
//       .enter().append('rect')
//       .attr('class', 'bar')
//       .attr('x', d => xScale(d.Estrato))
//       .attr('y', d => yScale(d.promedioPuntajeGlobal))
//       .attr('width', xScale.bandwidth())
//       .attr('height', d => height - yScale(d.promedioPuntajeGlobal))
//       .on('click', function(event, d) {
//         alert(`Estrato: ${d.Estrato}, Promedio : ${d.promedioPuntajeGlobal}`);
//       });

//     // Etiqueta para el eje X
//     svg.append('g')
//       .attr('class', 'x-axis')
//       .attr('transform', `translate(0,${height})`)
//       .call(d3.axisBottom(xScale))
//       .selectAll('text')
//       .attr('transform', 'rotate(-45)')
//       .attr('text-anchor', 'end');

//     // Etiqueta para el eje Y
//     svg.append('g')
//       .attr('class', 'y-axis')
//       .call(d3.axisLeft(yScale));

//     // Título del gráfico
//     svg.append('text')
//       .attr('x', width / 2)
//       .attr('y', -margin.top / 2)
//       .attr('text-anchor', 'middle')
//       .style('font-size', '16px')
//       .text('Gráfico de Barras Interactivo');

//     // Etiqueta para el eje X
//     svg.append('text')
//       .attr('x', width / 2)
//       .attr('y', height + margin.bottom / 1)
//       .attr('text-anchor', 'middle')
//       .style('font-size', '15px')
//       .style('font-family','Courier New')
//       .text('Estrato');

//     // Etiqueta para el eje Y
//     svg.append('text')
//       .attr('transform', 'rotate(-90)')
//       .attr('x', -height / 2)
//       .attr('y', -margin.left + 20)
//       .attr('text-anchor', 'middle')
//       .style('font-size', '14px')
//       .text('Puntajes');


//   })
//   // esto es si la peticion a la api no funciona
//   .catch(error => {
//     console.error('Error al obtener datos:', error);
//   });

// const data = require('./conexion'); // Importa los datos del archivo db.js

// Ahora puedes utilizar la variable 'data' en tu diagrama de barras






// const data = [
//   { Estrato: "sin estrato", promedioPuntajeGlobal: 212 },
//   { Estrato: "estrato 1", promedioPuntajeGlobal: 239 },
//   { Estrato: "estrato 2", promedioPuntajeGlobal: 252 },
//   { Estrato: "estrato 3", promedioPuntajeGlobal: 263 },
//   { Estrato: "estrato 4", promedioPuntajeGlobal: 276 },
//   { Estrato: "estrato 5", promedioPuntajeGlobal: 264 },
//   { Estrato: "estrato 6", promedioPuntajeGlobal: 277 }
// ];

// const svgWidth = 800;
// const svgHeight = 500;
// const margin = { top: 40, right: 30, bottom: 60, left: 60 };
// const width = svgWidth - margin.left - margin.right;
// const height = svgHeight - margin.top - margin.bottom;

// const svg = d3.select('#chart')
//   .append('svg')
//   .attr('width', svgWidth)
//   .attr('height', svgHeight)
//   .append('g')
//   .attr('transform', `translate(${margin.left},${margin.top})`);

//   console.log(data.map(d => d.Estrato))
//   console.log(data.map(d => d.Estrato))
// const xScale = d3.scaleBand()
//   .domain(data.map(d => d.Estrato))
//   .range([0, width])
//   .padding(0.1);

// const yScale = d3.scaleLinear()
//   .domain([0, d3.max(data, d => d.promedioPuntajeGlobal)])
//   .nice()
//   .range([height, 0]);

// svg.selectAll('.bar')
//   .data(data)
//   .enter().append('rect')
//   .attr('class', 'bar')
//   .attr('x', d => xScale(d.Estrato))
//   .attr('y', d => yScale(d.promedioPuntajeGlobal))
//   .attr('width', xScale.bandwidth())
//   .attr('height', d => height - yScale(d.promedioPuntajeGlobal))
//   .on('click', function(event, d) {
//     alert(`Estrato: ${d.Estrato}, Promedio : ${d.promedioPuntajeGlobal}`);
//   });

// // Etiqueta para el eje X
// svg.append('g')
//   .attr('class', 'x-axis')
//   .attr('transform', `translate(0,${height})`)
//   .call(d3.axisBottom(xScale))
//   .selectAll('text')
//   .attr('transform', 'rotate(-45)')
//   .attr('text-anchor', 'end');

// // Etiqueta para el eje Y
// svg.append('g')
//   .attr('class', 'y-axis')
//   .call(d3.axisLeft(yScale));

// // Título del gráfico
// svg.append('text')
//   .attr('x', width / 2)
//   .attr('y', -margin.top / 2)
//   .attr('text-anchor', 'middle')
//   .style('font-size', '16px')
//   .text('Gráfico de Barras Interactivo');

// // Etiqueta para el eje X
// svg.append('text')
//   .attr('x', width / 2)
//   .attr('y', height + margin.bottom / 1)
//   .attr('text-anchor', 'middle')
//   .style('font-size', '15px')
//   .style('font-family','Courier New')
//   .text('Estrato');

// // Etiqueta para el eje Y
// svg.append('text')
//   .attr('transform', 'rotate(-90)')
//   .attr('x', -height / 2)
//   .attr('y', -margin.left + 20)
//   .attr('text-anchor', 'middle')
//   .style('font-size', '14px')
//   .text('Puntajes');



const data = [
  { Estrato: "sin estrato", promedioPuntajeGlobal: 230 },
  { Estrato: "estrato 1", promedioPuntajeGlobal: 239 },
  { Estrato: "estrato 2", promedioPuntajeGlobal: 252 },
  { Estrato: "estrato 3", promedioPuntajeGlobal: 263 },
  { Estrato: "estrato 4", promedioPuntajeGlobal: 276 },
  { Estrato: "estrato 5", promedioPuntajeGlobal: 264 },
  { Estrato: "estrato 6", promedioPuntajeGlobal: 277 },
];

function createBarChart(selectedData) {
  const chartContainer = d3.select("#chart");
  chartContainer.selectAll('*').remove(); //inicializa todo, un clear 

  const svgWidth = 900;
  const svgHeight = 600;
  const margin = { top: 20, right: 30, bottom: 60, left: 60 };
  const width = svgWidth - margin.left - margin.right;
  const height = svgHeight - margin.top - margin.bottom;

  const svg = chartContainer
      .append('svg')
      .attr('width', svgWidth)
      .attr('height', svgHeight)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

  const xScale = d3.scaleBand()
      .domain(selectedData.map(d => d.Estrato))
      .range([0, width])
      .padding(0.1);

  const yScale = d3.scaleLinear()
      .domain([0, d3.max(selectedData, d => d.promedioPuntajeGlobal)])
      .nice()
      .range([height, 0]);


  svg.selectAll('.bar')
      .data(selectedData)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => xScale(d.Estrato))
      .attr('y', height)
      .attr('width', xScale.bandwidth())
      .attr('height', 0)
      .attr('fill', 'steelblue')
      .on('click', function (event, d) {
          alert(`Estrato: ${d.Estrato}, Promedio: ${d.promedioPuntajeGlobal}`);
      })
      .transition()
      .duration(1000)  // duración de la transición en milisegundos
      .attr('y', d => yScale(d.promedioPuntajeGlobal))
      .attr('height', d => height - yScale(d.promedioPuntajeGlobal));

  svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale))
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .attr('text-anchor', 'end');

  svg.append('g')
      .attr('class', 'y-axis')
      .call(d3.axisLeft(yScale));

  // svg.append('text')
  //     .attr('x', width / 2)
  //     .attr('y', -margin.top / 2)
  //     .attr('text-anchor', 'middle')
  //     .style('font-size', '16px')
  //     .text('Gráfico de Barras con Transiciones');

  
  svg.append('text')
    .attr('x', width / 2)
    .attr('y', height + margin.bottom+0.2 )
    .attr('text-anchor', 'middle')
    .style('font-size', '20px')  
    
    .text('Estrato');

  svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -height / 2)
      .attr('y', -margin.left + 20)
      .attr('text-anchor', 'middle')
      .style('font-size', '20px')  
      
    
      .text('Puntajes');

  svg.selectAll('.tick text')
    .style('font-family', 'Comfortaa, sans-serif');

  svg.selectAll('text')
    .style('font-family', 'Comfortaa, sans-serif');
}

createBarChart(data);

// Botones para ordenar los datos
d3.select("#sort-ascending") //practicamente buscan el  id="sort-ascending" en el html 
  .on("click", () => {
  //La función sort se utiliza para ordenar el arreglo de datos data. En el caso del botón "Orden Ascendente",
  // los datos se ordenan en orden ascendente en función del valor de la propiedad "promedioPuntajeGlobal
      const sortedData = data.slice().sort((a, b) => a.promedioPuntajeGlobal - b.promedioPuntajeGlobal);
      createBarChart(sortedData);
  });

d3.select("#sort-descending")
  .on("click", () => {
      const sortedData = data.slice().sort((a, b) => b.promedioPuntajeGlobal - a.promedioPuntajeGlobal);
      createBarChart(sortedData);
  });
