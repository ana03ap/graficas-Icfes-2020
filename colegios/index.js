// Datos

query = "Select d.cole_naturaleza, avg(d.punt_c_naturales) as naturales, avg(d.punt_ingles) as Ingles, avg(d.punt_lectura_critica) as Lectura,avg(d.punt_matematicas) as Math, avg(d.punt_sociales_ciudadanas) as Sociales, avg(d.punt_global) as Global from dbo.datos d group by d.cole_naturaleza "




// Agrega el parámetro 'query' a la URL como una cadena de consulta
url = `http://localhost:3003/api/data?query=${encodeURIComponent(query)}`;
fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log("hola desde colegio")
        console.log(data);


        data = [
            { category: "Math", value1: data[0].Math, value2: data[1].Math },
            { category: "Sociales", value1: data[0].Sociales, value2: data[1].Sociales },
            { category: "Lectura", value1: data[0].Lectura, value2: data[1].Lectura },
            { category: "Ingles", value1: data[0].Ingles, value2: data[1].Ingles },
            { category: "Naturales", value1: data[0].naturales, value2: data[1].naturales }
        ];

          console.log(data);

          const svgWidth = 900;
          const svgHeight = 600;

          const margin = { top: 20, right: 30, bottom: 60, left: 60 };
          const width = svgWidth - margin.left - margin.right;
          const height = svgHeight - margin.top - margin.bottom;

        const svg = d3.select("#chart-colegios")
            .append('svg')
            .attr('width', svgWidth)
            .attr('height', svgHeight)
            .append("g")
        
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        const x0 = d3.scaleBand()
            .domain(data.map(d => d.category))
            .range([0, width])
            .padding(0.1);

        const x1 = d3.scaleBand()
            .domain(["value1", "value2"])
            .range([0, x0.bandwidth()])
            .padding(0.05);

        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d3.max([d.value1, d.value2]))])
            .nice()
            .range([height, 0]);

        // Colores para las barras
        const color = d3.scaleOrdinal()
            .domain(["value1", "value2"])
            .range(["#57db9e", "#88a7d0"]);

        // Crear las barras
        svg.selectAll(".bar-colegio")
            .data(data)
            .enter().append("g")
            .attr("transform", d => `translate(${x0(d.category)}, 0)`)
            .selectAll("rect")
            .data(d => ["value1", "value2"].map(key => ({ key, value: d[key] })))
            .enter().append("rect")
            .attr("x", d => x1(d.key))
            .attr("y", d => y(d.value))
            .attr("width", x1.bandwidth())
            .attr("height", d => height - y(d.value))
            .attr("fill", d => color(d.key));

            // ejes
            svg.append("g")
            .attr("class", "x-axis")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x0))
            .selectAll("text") // Ajusta el tamaño del texto del eje x
            .attr("font-size", 14); // Ajusta el tamaño del texto del eje x
        
        svg.append("g")
            .attr("class", "y-axis")
            .call(d3.axisLeft(y))
            .selectAll("text") // Ajusta el tamaño del texto del eje y
            .attr("font-size", 14); // Ajusta el tamaño del texto del eje y



        // Leyenda
        var legend = svg.append("g")  // Crea un grupo SVG para la leyenda
            .attr("font-family", 'Comfortaa, sans-serif') // Define la fuente de la leyenda
            .attr("font-size", 13) // Define el tamaño de fuente de la leyenda
            .attr("text-anchor", "end") // Alinea el texto de la leyenda al final (derecha)
            .selectAll("g") // Selecciona todos los grupos dentro de "legend"
            .data(["Oficial", "No oficial"]) // Los datos para la leyenda
            .enter().append("g") // Agrega grupos para cada elemento de la leyenda
            .attr("transform", (d, i) => "translate(" + (width -50) + "," + (i * 25) + ")"); // Posiciona cada grupo de la leyenda

        legend.append("rect") // Agrega un rectángulo para los elementos de la leyenda
            .attr("x", 30) // Posición X del rectángulo
            .attr("width", 19) // Ancho del rectángulo
            .attr("height", 19) // Altura del rectángulo
            .attr("fill", d => color(d)); // Color del rectángulo basado en los datos

        legend.append("text") // Agrega texto para los elementos de la leyenda
            .attr("x", 24) // Posición X del texto
            .attr("y", 9.5) // Posición Y del texto
            .attr("dy", "0.32em") // Ajuste vertical del texto
            .text(d => d); // Texto basado en los datos

        svg.selectAll('.tick text')
                    .style('font-family', 'Comfortaa, sans-serif');

        svg.selectAll('text')
                    .style('font-family', 'Comfortaa, sans-serif');

    })
  // SI LA PETICION NO FUNCIONA 
    .catch(error => {
    console.error('Error al obtener datos:', error);
    });




    



// const data = [
//     { category: "Math", value1: 30, value2: 45 },
//     { category: "Ciencias Sociales", value1: 50, value2: 35 },
//     { category: "Lectura Critica", value1: 25, value2: 60 },
//     { category: "Ingles", value1: 40, value2: 20 },
//     { category: "Ciencias Naturales", value1: 60, value2: 50 }
// ];

// const svgWidth = 900;
// const svgHeight = 400;

// // Configuración
// const margin = { top: 20, right: 30, bottom: 40, left: 40 };
// const width = 600 - margin.left - margin.right;
// const height = 400 - margin.top - margin.bottom;

// const svg = d3.select("#chart-colegios")
//     .append('svg')
//     .attr('width', svgWidth)
//     .attr('height', svgHeight)
//     .append("g")
  
//     .attr("transform", `translate(${margin.left}, ${margin.top})`);

// const x0 = d3.scaleBand()
//     .domain(data.map(d => d.category))
//     .range([0, width])
//     .padding(0.1);

// const x1 = d3.scaleBand()
//     .domain(["value1", "value2"])
//     .range([0, x0.bandwidth()])
//     .padding(0.05);

// const y = d3.scaleLinear()
//     .domain([0, d3.max(data, d => d3.max([d.value1, d.value2]))])
//     .nice()
//     .range([height, 0]);

// // Colores para las barras
// const color = d3.scaleOrdinal()
//     .domain(["value1", "value2"])
//     .range(["#1f77b4", "#ff7f0e"]);

// // Crear las barras
// svg.selectAll(".bar")
//     .data(data)
//     .enter().append("g")
//     .attr("transform", d => `translate(${x0(d.category)}, 0)`)
//     .selectAll("rect")
//     .data(d => ["value1", "value2"].map(key => ({ key, value: d[key] })))
//     .enter().append("rect")
//     .attr("x", d => x1(d.key))
//     .attr("y", d => y(d.value))
//     .attr("width", x1.bandwidth())
//     .attr("height", d => height - y(d.value))
//     .attr("fill", d => color(d.key));

// // Ejes
// svg.append("g")
//     .attr("class", "x-axis")
//     .attr("transform", `translate(0, ${height})`)
//     .call(d3.axisBottom(x0));

// svg.append("g")
//     .attr("class", "y-axis")
//     .call(d3.axisLeft(y));

// // Leyenda
// var legend = svg.append("g")  // Crea un grupo SVG para la leyenda
//     .attr("font-family", "sans-serif") // Define la fuente de la leyenda
//     .attr("font-size", 12) // Define el tamaño de fuente de la leyenda
//     .attr("text-anchor", "end") // Alinea el texto de la leyenda al final (derecha)
//     .selectAll("g") // Selecciona todos los grupos dentro de "legend"
//     .data(["Colegio oficial", "Colegio no oficial"]) // Los datos para la leyenda
//     .enter().append("g") // Agrega grupos para cada elemento de la leyenda
//     .attr("transform", (d, i) => "translate(" + (width + 20) + "," + (i * 20) + ")"); // Posiciona cada grupo de la leyenda

// legend.append("rect") // Agrega un rectángulo para los elementos de la leyenda
//     .attr("x", 30) // Posición X del rectángulo
//     .attr("width", 19) // Ancho del rectángulo
//     .attr("height", 19) // Altura del rectángulo
//     .attr("fill", d => color(d)); // Color del rectángulo basado en los datos

// legend.append("text") // Agrega texto para los elementos de la leyenda
//     .attr("x", 24) // Posición X del texto
//     .attr("y", 9.5) // Posición Y del texto
//     .attr("dy", "0.32em") // Ajuste vertical del texto
//     .text(d => d); // Texto basado en los datos
