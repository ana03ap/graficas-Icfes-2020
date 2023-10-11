// ... (tu código anterior) ...


fetch('http://localhost:4000/api/data')
  .then(response => response.json())
  .then(data => {
  console.log(data[1])

    // Cargar datos geoespaciales de Colombia en formato TopoJSON
d3.json("colombia.json").then(function(colombia) {
    // Configurar la proyección para el mapa
    var projection = d3.geoMercator()
      .fitSize([800, 600], colombia);
  
    // Crear un generador de rutas basado en la proyección
    var path = d3.geoPath().projection(projection);
  
    // Crear el lienzo del mapa
    var svg = d3.select("#mapa")
      .append("svg")
      .attr("width", 800)
      .attr("height", 600);
  
    // Dibujar las regiones de Colombia
    svg.selectAll("path")
      .data(colombia.features)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("fill", "#ccc")
      .attr("stroke", "#fff")
      .attr("stroke-width", 0.5)
      .on("mouseover", function() {
        // Implementa interacción aquí (por ejemplo, mostrar información sobre el departamento)
        // Puedes usar d3.event para obtener información sobre el evento del mouse
      });
  });
  

  })
  // esto es si la peticion a la api no funciona
  .catch(error => {
    console.error('Error al obtener datos:', error);
  });







