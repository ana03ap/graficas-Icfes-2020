query = 'select Estrato, avg(punt_global) promedioPuntajeGlobal from dbo.datos group by Estrato  order by promedioPuntajeGlobal';

// Agrega el parámetro 'query' a la URL como una cadena de consulta
let url = `http://localhost:3004/api/data?query=${encodeURIComponent(query)}`;
fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log("hola desde barras interactivas")
    console.log(data);

        const popUp = document.querySelector('.popUp-be')
        const close = document.querySelector('#btnClose-popUp')
        const texto = document.querySelector('#txt-infopopUp-be')
        function createBarChart(selectedData) {
            const chartContainer = d3.select("#chart");
            chartContainer.selectAll('*').remove(); //inicializa todo, un clear 

            let svgWidth = 900;
            let svgHeight = 600;
            let margin = { top: 20, right: 30, bottom: 60, left: 60 };
            let width = svgWidth - margin.left - margin.right;
            let height = svgHeight - margin.top - margin.bottom;

            let svg = chartContainer
                .append('svg')
                .attr('width', svgWidth)
                .attr('height', svgHeight)
                .append('g')
                .attr('transform', `translate(${margin.left},${margin.top})`);

            let xScale = d3.scaleBand()
                .domain(selectedData.map(d => d.Estrato))
                .range([0, width])
                .padding(0.1);

            let yScale = d3.scaleLinear()
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
                  popUp.classList.toggle('popUpOn')
                  texto.innerHTML=  `Estrato: ${d.Estrato}, Promedio: ${d.promedioPuntajeGlobal}`
                    // alert(`Estrato: ${d.Estrato}, Promedio: ${d.promedioPuntajeGlobal}`);


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

        close.addEventListener('click', () => {
          popUp.classList.toggle('popUpOn')
      })

  })
  // SI LA PETICION NO FUNCIONA 
  .catch(error => {
    console.error('Error al obtener datos:', error);
  });




// const data = [
//   { Estrato: "sin estrato", promedioPuntajeGlobal: 230 },
//   { Estrato: "estrato 1", promedioPuntajeGlobal: 239 },
//   { Estrato: "estrato 2", promedioPuntajeGlobal: 252 },
//   { Estrato: "estrato 3", promedioPuntajeGlobal: 263 },
//   { Estrato: "estrato 4", promedioPuntajeGlobal: 276 },
//   { Estrato: "estrato 5", promedioPuntajeGlobal: 264 },
//   { Estrato: "estrato 6", promedioPuntajeGlobal: 277 },
// ];

// const popUp = document.querySelector('.popUp-be')
// const close = document.querySelector('#btnClose-popUp')
// const texto = document.querySelector('#txt-infopopUp-be')
// function createBarChart(selectedData) {
//   const chartContainer = d3.select("#chart");
//   chartContainer.selectAll('*').remove(); //inicializa todo, un clear 

//   const svgWidth = 900;
//   const svgHeight = 600;
//   const margin = { top: 20, right: 30, bottom: 60, left: 60 };
//   const width = svgWidth - margin.left - margin.right;
//   const height = svgHeight - margin.top - margin.bottom;

//   const svg = chartContainer
//       .append('svg')
//       .attr('width', svgWidth)
//       .attr('height', svgHeight)
//       .append('g')
//       .attr('transform', `translate(${margin.left},${margin.top})`);

//   const xScale = d3.scaleBand()
//       .domain(selectedData.map(d => d.Estrato))
//       .range([0, width])
//       .padding(0.1);

//   const yScale = d3.scaleLinear()
//       .domain([0, d3.max(selectedData, d => d.promedioPuntajeGlobal)])
//       .nice()
//       .range([height, 0]);


//   svg.selectAll('.bar')
//       .data(selectedData)
//       .enter().append('rect')
//       .attr('class', 'bar')
//       .attr('x', d => xScale(d.Estrato))
//       .attr('y', height)
//       .attr('width', xScale.bandwidth())
//       .attr('height', 0)
//       .attr('fill', 'steelblue')
//       .on('click', function (event, d) {
//         popUp.classList.toggle('popUpOn')
//         texto.innerHTML=  `Estrato: ${d.Estrato}, Promedio: ${d.promedioPuntajeGlobal}`
//           // alert(`Estrato: ${d.Estrato}, Promedio: ${d.promedioPuntajeGlobal}`);


//       })
//       .transition()
//       .duration(1000)  // duración de la transición en milisegundos
//       .attr('y', d => yScale(d.promedioPuntajeGlobal))
//       .attr('height', d => height - yScale(d.promedioPuntajeGlobal));

//   svg.append('g')
//       .attr('class', 'x-axis')
//       .attr('transform', `translate(0,${height})`)
//       .call(d3.axisBottom(xScale))
//       .selectAll('text')
//       .attr('transform', 'rotate(-45)')
//       .attr('text-anchor', 'end');

//   svg.append('g')
//       .attr('class', 'y-axis')
//       .call(d3.axisLeft(yScale));


//   svg.append('text')
//     .attr('x', width / 2)
//     .attr('y', height + margin.bottom+0.2 )
//     .attr('text-anchor', 'middle')
//     .style('font-size', '20px')  
    
//     .text('Estrato');

//   svg.append('text')
//       .attr('transform', 'rotate(-90)')
//       .attr('x', -height / 2)
//       .attr('y', -margin.left + 20)
//       .attr('text-anchor', 'middle')
//       .style('font-size', '20px')  
      
    
//       .text('Puntajes');

//   svg.selectAll('.tick text')
//     .style('font-family', 'Comfortaa, sans-serif');

//   svg.selectAll('text')
//     .style('font-family', 'Comfortaa, sans-serif');
// }



// createBarChart(data);

// // Botones para ordenar los datos
// d3.select("#sort-ascending") //practicamente buscan el  id="sort-ascending" en el html 
//   .on("click", () => {
//   //La función sort se utiliza para ordenar el arreglo de datos data. En el caso del botón "Orden Ascendente",
//   // los datos se ordenan en orden ascendente en función del valor de la propiedad "promedioPuntajeGlobal
//       const sortedData = data.slice().sort((a, b) => a.promedioPuntajeGlobal - b.promedioPuntajeGlobal);
//       createBarChart(sortedData);
//   });

// d3.select("#sort-descending")
//   .on("click", () => {
//       const sortedData = data.slice().sort((a, b) => b.promedioPuntajeGlobal - a.promedioPuntajeGlobal);
//       createBarChart(sortedData);
//   });

//   close.addEventListener('click', () => {
//     popUp.classList.toggle('popUpOn')
// })
