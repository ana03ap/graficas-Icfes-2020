 query = 'select Estrato, avg(punt_global) promedioPuntajeGlobal from dbo.datos group by Estrato  order by promedioPuntajeGlobal';

// Agrega el parámetro 'query' a la URL como una cadena de consulta
url = `http://localhost:3001/api/data?query=${encodeURIComponent(query)}`;
console.log('hola')
fetch(url)
  .then(response => response.json())
  .then(data => {

    console.log(data);

  
    console.log("hola desde cliente")
    // cuando la peticion a la api está funcionando
    const svgWidth = 800;
    const svgHeight = 500;
    const margin = { top: 40, right: 30, bottom: 60, left: 60 };
    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;

    const svg = d3.select('#chart')
      .append('svg')
      .attr('width', svgWidth)
      .attr('height', svgHeight)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);


      console.log(data.map(d => d.Estrato))
    const xScale = d3.scaleBand()
      .domain(data.map(d => d.Estrato))
      .range([0, width])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.promedioPuntajeGlobal)])
      .nice()
      .range([height, 0]);

    svg.selectAll('.bar')
      .data(data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => xScale(d.Estrato))
      .attr('y', d => yScale(d.promedioPuntajeGlobal))
      .attr('width', xScale.bandwidth())
      .attr('height', d => height - yScale(d.promedioPuntajeGlobal))
      .on('click', function(event, d) {
        alert(`Estrato: ${d.Estrato}, Promedio : ${d.promedioPuntajeGlobal}`);
      });

    // Etiqueta para el eje X
    svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale))
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .attr('text-anchor', 'end');

    // Etiqueta para el eje Y
    svg.append('g')
      .attr('class', 'y-axis')
      .call(d3.axisLeft(yScale));

    // Título del gráfico
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', -margin.top / 2)
      .attr('text-anchor', 'middle')
      .style('font-size', '16px')
      .text('Gráfico de Barras Interactivo');

    // Etiqueta para el eje X
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', height + margin.bottom / 1)
      .attr('text-anchor', 'middle')
      .style('font-size', '15px')
      .style('font-family','Courier New')
      .text('Estrato');

    // Etiqueta para el eje Y
    svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -height / 2)
      .attr('y', -margin.left + 20)
      .attr('text-anchor', 'middle')
      .style('font-size', '14px')
      .text('Puntajes');


  })
  // esto es si la peticion a la api no funciona
  .catch(error => {
    console.error('Error al obtener datos:', error);
  });



