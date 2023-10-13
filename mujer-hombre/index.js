query = "Select d.[Genero Estd], avg(d.punt_c_naturales) as ciencias, avg(d.punt_ingles) as Ingles, avg(d.punt_lectura_critica) as Lectura,avg(d.punt_matematicas) as Math, avg(d.punt_sociales_ciudadanas) as Sociales, avg(d.punt_global) as global from datos d group by d.[Genero Estd] "

// Agrega el parámetro 'query' a la URL como una cadena de consulta
 url = `http://localhost:3003/api/data?query=${encodeURIComponent(query)}`;
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


    // let  womenData =  [
    //      { Estrato: "sin estrato", promedioPuntajeGlobal: 230 },
    //        { Estrato: "estrato 1", promedioPuntajeGlobal: 239 },
    //        { Estrato: "estrato 2", promedioPuntajeGlobal: 252 },
    //        { Estrato: "estrato 3", promedioPuntajeGlobal: 263 },
    //        { Estrato: "estrato 4", promedioPuntajeGlobal: 276 },
    //        { Estrato: "estrato 5", promedioPuntajeGlobal: 264 },
    //        { Estrato: "estrato 6", promedioPuntajeGlobal: 277 },
    //     ];

    //     let  menData =  [
    //         { Estrato: "sin estratqo", promedioPuntajeGlobal: 230 },
    //         { Estrato: "estrato 1", promedioPuntajeGlobal: 239 },
    //         { Estrato: "estrato 2", promedioPuntajeGlobal: 252 },
    //         { Estrato: "estrato 3", promedioPuntajeGlobal: 263 },
    //         { Estrato: "estrato 4", promedioPuntajeGlobal: 276 },
    //         { Estrato: "estrato 5", promedioPuntajeGlobal: 264 },
    //         { Estrato: "estrato 6", promedioPuntajeGlobal: 277 },
    //         ];
        
    console.log(womenData)
        function createBarChart(selectedData,namebar) {
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

            const xScale = d3.scaleBand()
                .domain(selectedData.map(d => d.Materia))
                .range([0, width])
                .padding(0.1);

            const yScale = d3.scaleLinear()
                .domain([0, d3.max(selectedData, d => d.promedio)])
                .nice()
                .range([height, 0]);


            svg.selectAll('.bar')
                .data(selectedData)
                .enter().append('rect')
                .attr('class', `${namebar}`)
                .attr('x', d => xScale(d.Materia))
                .attr('y', height)
                .attr('width', xScale.bandwidth())
                .attr('height', 0)
                .attr('fill', 'green')
                .on('click', function (event, d) {
                 
                    // alert(`Estrato: ${d.Estrato}, Promedio: ${d.promedioPuntajeGlobal}`);


                })
                .transition()
                .duration(1000)  // duración de la transición en milisegundos
                .attr('y', d => yScale(d.promedio))
                .attr('height', d => height - yScale(d.promedio));

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
            //   .attr('x', width / 2)
            //   .attr('y', height + margin.bottom+0.2 )
            //   .attr('text-anchor', 'middle')
            //   .style('font-size', '20px')  
              
            //   .text('Materia');

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



      createBarChart(womenData,'barf');
      
      // Botones para ordenar los datos
      d3.select("#mujer") //practicamente buscan el  id="sort-ascending" en el html 
        .on("click", () => {
        //La función sort se utiliza para ordenar el arreglo de datos data. En el caso del botón "Orden Ascendente",
        // los datos se ordenan en orden ascendente en función del valor de la propiedad "promedioPuntajeGlobal
            // const sortedData = data.slice().sort((a, b) => a.promedioPuntajeGlobal - b.promedioPuntajeGlobal);
            createBarChart(womenData,'barf');
            
        });

      d3.select("#hombre")
        .on("click", () => {
            // const sortedData = data.slice().sort((a, b) => b.promedioPuntajeGlobal - a.promedioPuntajeGlobal);
            createBarChart(menData,'barm');
            
            
        });

        

  })
  // SI LA PETICION NO FUNCIONA 
  .catch(error => {
    console.error('Error al obtener datos:', error);
  });
