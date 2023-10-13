

const datika  = [{
    '100-150': 540,
    '150-200': 56783,
    '200-250': 135738,
    '250-300': 122513,
    '300-350': 54749,
    '350-400': 8954,
    '400-450': 850,
    '450-500': 46,

}]

const datiko = Object.entries(datika[0]).map(([label, value]) => ({
    label: label,
    value: value
  }));
  
  console.log(datiko);

function drawDonut(data) {

    d3.select("#chart-donut").selectAll("svg").remove(); // Eliminar todos los SVG previos

    const width = 800;
    const height = 600;
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
        .range(["#FCCD9F", "#D5FC9F", "#CFCBFE", "#FFF6B8", "#D6D28F", "#FFD0D2", "#D2FFE6"]);

    

    const duration = 1000; // Duración de la animación en milisegundos
    const duration2 = 200; // Duración de la animación en milisegundos
    svg.append("g")
        .attr("stroke", "white")
        .selectAll("path")
        .data(pie(data))
        .join("path")
        .attr("fill", (d, i) => colorPalette(i))
        // .attr("d", arc)
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

            // Agregar las etiquetas de texto después del retraso
            // setTimeout(() => {
            //     svg.append("g")
            //         .attr("font-family", "Comfortaa")
            //         .attr("font-size", 12)
            //         .attr("text-anchor", "middle")
            //         .selectAll("text")
            //         .data(pie(data))
            //         .join("text")
            //         .attr("transform", (d) => `translate(${arcLabel.centroid(d)})`)
            //         .call(text => text.append("tspan")
            //             .attr("y", "-0.4em")
            //             .attr("font-weight", "bold")
            //             .text((d) => d.data.label))
            //         .call(text => text.filter((d) => (d.endAngle - d.startAngle) > 0.25).append("tspan")
            //             .attr("x", 0)
            //             .attr("y", "0.7em")
            //             .attr("fill-opacity", 0.7)
            //             .text((d) => d.data.value));
            // }, duration2); // El retraso se establece en la duración de la animación
        });



    // Agregar un círculo en el centro para crear un donut
    svg.append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", radius - 70)
        .attr("fill", "white");

    // Agregar un título al donut pie chart
    // svg.append("text")
    //     .attr("text-anchor", "middle")
    //     .attr("font-size", 20)
    //     .text("Mi Donut Pie Chart");

}

// Llamar a la función para dibujar el donut con los datos iniciales
drawDonut(datiko);

// Agregar un temporizador para repetir automáticamente el donut cada segundo
setInterval(() => {
    drawDonut(datiko);
}, 6000);