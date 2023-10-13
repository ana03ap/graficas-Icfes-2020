
// los colores van en orden 
// const datika  = [{
//     '100-150': 540, "#3FE0d0"
//     '150-200': 56783, "#7ef9ff"
//     '200-250': 135738, "#4397a3"
//     '250-300': 122513, "#588bae"
//     '300-350': 54749, "#6593f5"
//     '350-400': 8954, "#7285a5"
//     '400-450': 850, "#0e4d92"
//     '450-500': 46,

// }]






query = "WITH nueva AS (SELECT SUM(CASE WHEN d.punt_global >= 100 AND d.punt_global < 150 THEN 1 ELSE 0 END) AS '100-150',SUM(CASE WHEN d.punt_global >= 150 AND d.punt_global < 200 THEN 1 ELSE 0 END) AS '150-200',SUM(CASE WHEN d.punt_global >= 200 AND d.punt_global < 250 THEN 1 ELSE 0 END) AS '200-250',SUM(CASE WHEN d.punt_global >= 250 AND d.punt_global < 300 THEN 1 ELSE 0 END) AS '250-300',SUM(CASE WHEN d.punt_global >= 300 AND d.punt_global < 350 THEN 1 ELSE 0 END) AS '300-350',SUM(CASE WHEN d.punt_global >= 350 AND d.punt_global < 400 THEN 1 ELSE 0 END) AS '350-400',SUM(CASE WHEN d.punt_global >= 400 AND d.punt_global <= 450 THEN 1 ELSE 0 END) AS '400-450',SUM(CASE WHEN d.punt_global >= 450 AND d.punt_global <= 500 THEN 1 ELSE 0 END) AS '450-500'FROM dbo.datos d)SELECT *FROM nueva"

// Agrega el parámetro 'query' a la URL como una cadena de consulta
url = `http://localhost:3003/api/data?query=${encodeURIComponent(query)}`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log("hola desde donut")
    console.log(data);
    console.log("hola desde circulo en ingles")
    console.log(data);
    const color1d = document.getElementById("txt-uno-dona");
    const color2d = document.getElementById("txt-dos-dona");
    const color3d = document.getElementById("txt-tres-dona");
    const color4d = document.getElementById("txt-cuatro-dona");
    const color5d = document.getElementById("txt-cinco-dona");
    const color6d = document.getElementById("txt-seis-dona");
    const color7d = document.getElementById("txt-siete-dona");
    const color8d = document.getElementById("txt-ocho-dona");

    const unod = document.getElementById("uno-dona");
    const dosd = document.getElementById("dos-dona");
    const tresd= document.getElementById("tres-dona");
    const cuatrod = document.getElementById("cuatro-dona");
    const cincod = document.getElementById("cinco-dona");
   

    const nivelesD = Object.keys(data[0]);        
    color1d.innerHTML = `${nivelesD[0]} `;
    color2d.innerHTML = `${nivelesD[1]} `;
    color3d.innerHTML = `${nivelesD[2]} `;
    color4d.innerHTML = `${nivelesD[3]} `;
    color5d.innerHTML = `${nivelesD[4]} `;
    color6d.innerHTML = `${nivelesD[5]} `;
    color7d.innerHTML = `${nivelesD[6]} `;
    color8d.innerHTML = `${nivelesD[7]} `;







    const datiko = Object.entries(data[0]).map(([label, value]) => ({
        label: label,
        value: value
      }));
      
      console.log(datiko);
    
    function drawDonut(data) {
    
        d3.select("#chart-donut").selectAll("svg").remove(); // Eliminar todos los SVG previos
    
        const width = 700;
        const height = 800;
        const radius = Math.min(width, height) / 2;
    
    
        const svg = d3.select("#chart-donut")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    
        const pie = d3.pie()
            .value((d) => d.value);
    
        const arc = d3.arc()
            .outerRadius(radius - 10) // Radios exteriores ajustados
            .innerRadius(radius - 200); // Radios interiores ajustados
    
    
        const arcLabel = d3.arc()
            .innerRadius(radius - 40)
            .outerRadius(radius - 40);
    
        // Definir una paleta de colores pasteles personalizada
        const colorPalette = d3.scaleOrdinal()
            .range(["#3FE0d0", "#7ef9ff", "#4397a3", "#588bae", "#6593f5", "#7285a5", "#0e4d92", "#021830"]);
    
            
    
        const duration = 1000; // Duración de la animación en milisegundos
        const duration2 = 200; // Duración de la animación en milisegundos
        svg.append("g")
            .attr("stroke", "white")
            .selectAll("path")
            .data(pie(data))
            .join("path")
            .attr("fill", (d, i) => colorPalette(i))
            .attr("d", arc)
            .transition()
            .duration(duration)
            .attrTween("d", function (d) {
                const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
                return function (t) {
                    return arc(interpolate(t));
                };
            })
            .on("end", function (d) {
                // Agregar la etiqueta de título después de la animación
                d3.select(this)
                    .append("title")
                    // .text((d) => `${d.data.label}: ${d.data.value}`);
    
                //Agregar las etiquetas de texto después del retraso
                setTimeout(() => {

                   

                    // svg.append("g")
                    //     .attr("font-family", "Comfortaa")
                    //     .attr("font-size", 12)
                    //     .attr("text-anchor", "middle")
                    //     .selectAll("text")
                    //     .data(pie(data))
                    //     .join("text")
                    //     .attr("transform", (d) => `translate(${arcLabel.centroid(d)})`)
                    //     .call(text => text.append("tspan")
                    //         .attr("y", "-0.4em")
                    //         .attr("font-weight", "bold")
                    //         .text((d) => d.data.label))
                    //     .call(text => text.filter((d) => (d.endAngle - d.startAngle) > 0.25).append("tspan")
                    //         .attr("x", 0)
                    //         .attr("y", "0.7em")
                    //         .attr("fill-opacity", 0.7)
                    //         .text((d) => d.data.value));
                }, duration2); // El retraso se establece en la duración de la animación
            });
    
    
    
        // Agregar un círculo en el centro para crear un donut
        svg.append("circle")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("r", radius - 70)
            .attr("fill", "beige");
    
        // Agregar un título al donut pie chart
        // svg.append("text")
        //     .attr("text-anchor", "middle")
        //     .attr("font-size", 20)
        //     .text("Mi Donut Pie Chart\n HOLA");
    
    }
    
    // Llamar a la función para dibujar el donut con los datos iniciales
    drawDonut(datiko);
    
    // Agregar un temporizador para repetir automáticamente el donut cada segundo
    setInterval(() => {
        drawDonut(datiko);
    }, 6000);
    
  })
  // SI LA PETICION NO FUNCIONA 
  .catch(error => {
    console.error('Error al obtener datos:', error);
  });