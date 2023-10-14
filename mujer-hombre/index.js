query = "Select d.[Genero Estd], avg(d.punt_c_naturales) as ciencias, avg(d.punt_ingles) as Ingles, avg(d.punt_lectura_critica) as Lectura,avg(d.punt_matematicas) as Math, avg(d.punt_sociales_ciudadanas) as Sociales, avg(d.punt_global) as global from datos d group by d.[Genero Estd] "

// Agrega el parámetro 'query' a la URL como una cadena de consulta
 url = `http://localhost:3004/api/data?query=${encodeURIComponent(query)}`;
fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log("hola desde barras interactivas MUJER Y HOMBRE")
    console.log(data);
    
    // let womenData=[data[0]] 
    // let menData= [data[1]]
    // const arrayGenero = [
    //   {
    //     'Genero Estd': 'f',
    //     PromedioCiencias: 48,
    //     PromedioIngles: 47,
    //     PromedioLecturaC: 52,
    //     PromedioMath: 50,
    //     PromedioSocialesC: 48,
    //     PromedioPuntGlobal: 248
    //   },
    //   {
    //     'Genero Estd': 'm',
    //     PromedioCiencias: 49,
    //     PromedioIngles: 48,
    //     PromedioLecturaC: 52,
    //     PromedioMath: 53,
    //     PromedioSocialesC: 49,
    //     PromedioPuntGlobal: 255
    //   }
    // ]

    let womenData = Object.entries(data[0]).map(([Materia, promedio]) => ({
      Materia: Materia,
      promedio: promedio
    })).slice(1, -1);; 
    
    console.log(womenData);

    let menData = Object.entries(data[1]).map(([Materia, promedio]) => ({
      Materia: Materia,
      promedio: promedio
    })).slice(1, -1);; 
    
    console.log(menData);


        
    console.log(womenData)

      function createHorizontalBarChart(selectedData, namebar) {
        const chartContainer = d3.select("#chart-genero");
        chartContainer.selectAll('*').remove(); //inicializa todo, un clear 
    
        const svgWidth = 500;
        const svgHeight = 400;
        const margin = { top: 20, right: 30, bottom: 60, left: 60 };
        const width = svgWidth - margin.left - margin.right;
        const height = svgHeight - margin.top - margin.bottom;
    
        const svg = chartContainer
            .append('svg')
            .attr('width', svgWidth)
            .attr('height', svgHeight)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);
    
        const yScale = d3.scaleBand()
            .domain(selectedData.map(d => d.Materia))
            .range([0, height])
            .padding(0.1);
    
        const xScale = d3.scaleLinear()
            .domain([0, d3.max(selectedData, d => d.promedio)])
            .nice()
            .range([0, width]);
    
        svg.selectAll('.bar')
            .data(selectedData)
            .enter().append('rect')
            .attr('class', `${namebar}`)
            .attr('y', d => yScale(d.Materia))
            .attr('x', 0)
            .attr('height', yScale.bandwidth())
            .attr('width', 0)
            .attr('fill', 'green')
            .on('click', function (event, d) {
                // Aquí puedes manejar eventos de clic en las barras
            })
            .transition()
            .duration(1000)
            .attr('width', d => xScale(d.promedio))
            .attr('height', yScale.bandwidth());
    
        svg.append('g')
            .attr('class', 'y-axis')
            .call(d3.axisLeft(yScale));
    
        svg.append('g')
            .attr('class', 'x-axis')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(xScale));
    
        svg.append('text')
            .attr('transform', `translate(${width / 2},${-margin.top / 2})`)
            .attr('text-anchor', 'middle')
            .style('font-size', '10px')
            .text('Materias');
    
        svg.selectAll('.tick text')
            .style('font-family', 'Comfortaa, sans-serif');
    
        svg.selectAll('text')
            .style('font-family', 'Comfortaa, sans-serif');
    }
    
    createHorizontalBarChart(womenData, 'barf');
    
    d3.select("#mujer").on("click", () => {
        createHorizontalBarChart(womenData, 'barf');
    });
    
    d3.select("#hombre").on("click", () => {
        createHorizontalBarChart(menData, 'barm');
    });
    
  })
  // SI LA PETICION NO FUNCIONA 
  .catch(error => {
    console.error('Error al obtener datos:', error);
  });
